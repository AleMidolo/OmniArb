import { expect, test } from "@playwright/test";

test("presents the Italian pre-launch experience", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/OmniArb/);
  await expect(page.locator("html")).toHaveAttribute("lang", "it");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Individua il margine");
  await expect(page.getByRole("button", { name: "Prossimamente" }).first()).toBeDisabled();
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator("input, textarea, select")).toHaveCount(0);
  await expect(page.getByText("Profitto teorico")).toBeVisible();
  await expect(page.getByText("18+", { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/stop ai rinnovi, accesso fino alla fine del periodo già pagato/i)).toBeVisible();
});

test("keeps skip navigation and FAQ keyboard-accessible", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Vai al contenuto" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#contenuto")).toBeFocused();

  const firstSummary = page.locator("#domande summary").first();
  await firstSummary.focus();
  await expect(firstSummary).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#domande details").first()).toHaveAttribute("open", "");
});

test("has no responsive horizontal overflow or browser runtime errors", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/", { waitUntil: "networkidle" });

  const viewportMetrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(viewportMetrics.scrollWidth).toBeLessThanOrEqual(viewportMetrics.clientWidth + 1);
  await expect(page.getByRole("navigation", { name: "Navigazione principale" })).toBeVisible();
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
  await expect(page.locator("img:not([alt])")).toHaveCount(0);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("respects reduced-motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const scrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(scrollBehavior).toBe("auto");
});

test("rejects crafted checkout creation while pre-launch is active", async ({ request }) => {
  const response = await request.post("/api/checkout/setup?mode=COMMERCIAL", {
    data: { mode: "COMMERCIAL", entitlement: "active" },
    headers: { "x-http-method-override": "GET" },
  });

  expect(response.status()).toBe(503);
  expect(response.headers()["cache-control"]).toBe("no-store");
  await expect(response.json()).resolves.toMatchObject({
    error: { code: "COMMERCIAL_DISABLED" },
  });

  const nonexistentCommercialRoute = await request.post("/api/subscription/start");
  expect(nonexistentCommercialRoute.status()).toBe(404);
});
