import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test
    await page.goto("/");
  });

  test("meta is correct on the HomePage", async ({ page }) => {
    await expect(page).toHaveTitle(
      "TechPeople Blog - Articles, Stories & Tutorials For Tech Peoples",
    );
  });

  test("content render without any error", async ({ page }) => {
    await expect(
      page.getByRole("navigation", { name: "Tech Blog Options" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: " Articles, Stories & Tutorials For Tech Peoples ",
      }),
    ).toBeVisible();

    await expect(page.getByRole("form", { name: "Search Text" })).toBeVisible();

    await expect(page.getByRole("main")).toBeVisible();

    await expect(page.getByLabel("Footer")).toBeVisible();
  });
});
