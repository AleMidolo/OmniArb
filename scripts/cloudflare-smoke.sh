#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-8787}"
BASE_URL="http://127.0.0.1:${PORT}"
LOG_FILE="${RUNNER_TEMP:-/tmp}/omniarb-wrangler.log"

npx wrangler dev --config dist/server/wrangler.json --local --port "${PORT}" >"${LOG_FILE}" 2>&1 &
WRANGLER_PID=$!
trap 'kill "${WRANGLER_PID}" 2>/dev/null || true' EXIT

for _ in $(seq 1 40); do
  if curl --silent --fail "${BASE_URL}/" >/dev/null; then
    break
  fi
  sleep 1
done

HOME_HEADERS="$(mktemp)"
HOME_BODY="$(mktemp)"
curl --silent --show-error --dump-header "${HOME_HEADERS}" --output "${HOME_BODY}" "${BASE_URL}/"
grep -qi '^content-security-policy:' "${HOME_HEADERS}"
grep -qi '^x-content-type-options: nosniff' "${HOME_HEADERS}"
if grep -qi '^x-powered-by:' "${HOME_HEADERS}"; then
  echo "Unexpected X-Powered-By header" >&2
  exit 1
fi

grep -q 'Prossimamente' "${HOME_BODY}"

NOT_FOUND_STATUS="$(curl --silent --output /tmp/omniarb-not-found.html --write-out '%{http_code}' "${BASE_URL}/__worker-not-found-smoke")"
test "${NOT_FOUND_STATUS}" = "404"

CHECKOUT_HEADERS="$(mktemp)"
CHECKOUT_BODY="$(mktemp)"
CHECKOUT_STATUS="$(curl --silent --show-error --dump-header "${CHECKOUT_HEADERS}" --output "${CHECKOUT_BODY}" --write-out '%{http_code}' \
  -X POST \
  -H 'Content-Type: application/json' \
  -H 'X-HTTP-Method-Override: GET' \
  --data '{"mode":"COMMERCIAL","OMNIARB_MODE":"COMMERCIAL"}' \
  "${BASE_URL}/api/checkout/setup?mode=COMMERCIAL&OMNIARB_MODE=COMMERCIAL")"

test "${CHECKOUT_STATUS}" = "503"
grep -qi '^cache-control: no-store' "${CHECKOUT_HEADERS}"
grep -q 'COMMERCIAL_DISABLED' "${CHECKOUT_BODY}"

echo "Cloudflare Worker smoke checks passed on ${BASE_URL}."
