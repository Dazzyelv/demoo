import { Page, expect } from 'playwright/test';


export async function verifyLoginError(page: Page, expectedMessage: string) {
  const errorMessage = await page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(expectedMessage);
}


export async function verifyCheckoutError(page: Page, expectedMessage: string) {
  const errorMessage = await page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(expectedMessage);
}
