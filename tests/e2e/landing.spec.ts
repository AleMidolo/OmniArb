import { expect, test } from "@playwright/test";

test("presents the Italian pre-launch experience", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/OmniArb/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Individua il margine");
  await expect(page.getByRole("button", { name: "Prossimamente" }).first()).toBeDisabled();
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByText("Profitto teorico")).toBeVisible();
  await expect(page.getByText("18+", { exact: true }).first()).toBeVisible();
});

test("keeps the principal navigation keyboard-accessible", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Vai al contenuto" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#contenuto")).toBeFocused();
});

test("rejects checkout creation while pre-launch is active", async ({ request }) => {
  const response = await request.post("/api/checkout/setup");

  expect(response.status()).toBe(503);
  await expect(response.json()).resolves.toMatchObject({
    error: { code: "COMMERCIAL_DISABLED" },
  });
});
