import { test, expect } from "@playwright/test";

test("meta is correct", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page).toHaveTitle("Documentation Cypher");
});

test("test string input", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page
    .getByRole("textbox")
    .fill("What is the mandate of the support department?");
});
