import { test, expect } from '@playwright/test';
import { login } from '../src/auth';
import { addItemToCart } from '../src/cart';
import { proceedToCheckout, fillCheckoutForm, confirmOrder, verifyOrderSuccess } from '../src/checkout';

test.describe('Checkout tests on Saucedemo', () => {

  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
  });

  test('Successful order placement', async ({ page }) => {
    await addItemToCart(page, 'Sauce Labs Backpack');
    await proceedToCheckout(page);
    await fillCheckoutForm(page);
    await confirmOrder(page);
    await verifyOrderSuccess(page);
  });

  test('Attempting to checkout with missing form fields', async ({ page }) => {
    
    await addItemToCart(page, 'Sauce Labs Backpack');
    await proceedToCheckout(page);
    await page.click('#continue');
    const errorMessage = await page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Error: First Name is required');
  });
});
