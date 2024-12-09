import { test, expect } from "@playwright/test";
import constant from "../leftMenuOptions.json";

const BASE_URL = "https://parabank.parasoft.com/parabank/index.htm";

test.describe("UI Tests", () => {
  test("Username field is visible", async ({ page }) => {
    const userName = "input[name='username']";

    await page.goto(BASE_URL);

    await page.waitForSelector(userName);

    const userNameField = await page.locator(userName);

    expect(userNameField).toBeVisible();
  });

  test("Password field is visible", async ({ page }) => {
    const password = "input[name='password']";

    await page.goto(BASE_URL);

    await page.waitForSelector(password);

    const passwordField = await page.locator(password);

    expect(passwordField).toBeVisible();
  });

  constant.Pages.forEach(({ name, url }) => {
    test(`Verify when clicking in the menu the page is redirected to the correct path :: ${name}`, async ({
      page,
    }) => {
      await page.context().clearCookies();
      await page.goto(BASE_URL);

      const link = page
        .locator("#headerPanel")
        .getByRole("link", { name: name });
      await link.click();

      await expect(page).toHaveURL(url);
    });
  });
});
