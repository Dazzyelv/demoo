import { test, expect } from '@playwright/test';
import { login } from '../src/auth';
import { addItemToCart, verifyItemInCart, removeItemFromCart, verifyCartIsEmpty } from '../src/cart';

test.describe('Cart tests on Saucedemo', () => {

  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
  });

  test('Add a single item to the cart', async ({ page }) => {
    await addItemToCart(page, 'Sauce Labs Backpack');
    await verifyItemInCart(page, 'Sauce Labs Backpack');
  });

  test('Remove item from the cart', async ({ page }) => {
    await addItemToCart(page, 'Sauce Labs Backpack');
    await page.click('.shopping_cart_link');
    await removeItemFromCart(page, 'Sauce Labs Backpack');
    await verifyCartIsEmpty(page);
  });
  

  test('Add multiple items to the cart', async ({ page }) => {
    await addItemToCart(page, 'Sauce Labs Backpack');
    await addItemToCart(page, 'Sauce Labs Bike Light');
    await verifyItemInCart(page, 'Sauce Labs Backpack');
    await verifyItemInCart(page, 'Sauce Labs Bike Light');
  });
});
