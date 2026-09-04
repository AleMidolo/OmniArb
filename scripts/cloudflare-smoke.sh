#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-8787}"
LOG_FILE="${RUNNER_TEMP:-/tmp}/omniarb-wrangler.log"
WRANGLER_PID=""

if [[ -z "${BASE_URL:-}" ]]; then
  BASE_URL="http://127.0.0.1:${PORT}"
  npx wrangler dev --config dist/server/wrangler.json --local --port "${PORT}" >"${LOG_FILE}" 2>&1 &
  WRANGLER_PID=$!
  trap 'kill "${WRANGLER_PID}" 2>/dev/null || true' EXIT
fi

READY=false
LAST_STATUS="000"
LAST_HEADERS="$(mktemp)"
LAST_BODY="$(mktemp)"

for _ in $(seq 1 40); do
  : >"${LAST_HEADERS}"
  : >"${LAST_BODY}"
  LAST_STATUS="$(curl --silent --show-error --max-time 5 \
    --dump-header "${LAST_HEADERS}" \
    --output "${LAST_BODY}" \
    --write-out '%{http_code}' \
    "${BASE_URL}/" || true)"

  if [[ "${LAST_STATUS}" =~ ^2[0-9][0-9]$ ]]; then
    READY=true
    break
  fi

  if [[ -n "${WRANGLER_PID}" ]] && ! kill -0 "${WRANGLER_PID}" 2>/dev/null; then
    break
  fi

  sleep 1
done

if [[ "${READY}" != "true" ]]; then
  echo "Cloudflare Worker did not become reachable at ${BASE_URL}." >&2
  echo "Last HTTP status: ${LAST_STATUS}" >&2
  echo "--- response headers ---" >&2
  cat "${LAST_HEADERS}" >&2 || true
  echo "--- response body (first 80 lines) ---" >&2
  sed -n '1,80p' "${LAST_BODY}" >&2 || true
  if [[ -n "${WRANGLER_PID}" && -f "${LOG_FILE}" ]]; then
    echo "--- local Wrangler log ---" >&2
    cat "${LOG_FILE}" >&2
  fi
  exit 1
fi

HOME_HEADERS="$(mktemp)"
HOME_BODY="$(mktemp)"
HOME_STATUS="$(curl --silent --show-error --max-time 10 \
  --dump-header "${HOME_HEADERS}" \
  --output "${HOME_BODY}" \
  --write-out '%{http_code}' \
  "${BASE_URL}/")"
test "${HOME_STATUS}" = "200"
grep -qi '^content-security-policy:' "${HOME_HEADERS}"
grep -qi '^x-content-type-options: nosniff' "${HOME_HEADERS}"
if grep -qi '^x-powered-by:' "${HOME_HEADERS}"; then
  echo "Unexpected X-Powered-By header" >&2
  exit 1
fi

grep -q 'Prossimamente' "${HOME_BODY}"

NOT_FOUND_STATUS="$(curl --silent --max-time 10 --output /tmp/omniarb-not-found.html --write-out '%{http_code}' "${BASE_URL}/__worker-not-found-smoke")"
test "${NOT_FOUND_STATUS}" = "404"

CHECKOUT_HEADERS="$(mktemp)"
CHECKOUT_BODY="$(mktemp)"
CHECKOUT_STATUS="$(curl --silent --show-error --max-time 10 --dump-header "${CHECKOUT_HEADERS}" --output "${CHECKOUT_BODY}" --write-out '%{http_code}' \
  -X POST \
  -H 'Content-Type: application/json' \
  -H 'X-HTTP-Method-Override: GET' \
  --data '{"mode":"COMMERCIAL","OMNIARB_MODE":"COMMERCIAL"}' \
  "${BASE_URL}/api/checkout/setup?mode=COMMERCIAL&OMNIARB_MODE=COMMERCIAL")"

test "${CHECKOUT_STATUS}" = "503"
grep -qi '^cache-control: no-store' "${CHECKOUT_HEADERS}"
grep -q 'COMMERCIAL_DISABLED' "${CHECKOUT_BODY}"

echo "Cloudflare Worker smoke checks passed on ${BASE_URL}."
