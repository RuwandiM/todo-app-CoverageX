const { test, expect } = require('@playwright/test');

test('user can add and mark todo as done', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('input[name="title"]', 'E2E Test Todo');
  await page.fill('textarea[name="description"]', 'E2E Test Description');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=E2E Test Todo').last()).toBeVisible();
  await page.click('button[aria-label="Done"]');
  await expect(page.locator('text=E2E Test Todo')).not.toBeVisible();
});