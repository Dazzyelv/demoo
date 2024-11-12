import { test, expect } from '@playwright/test';
import { login } from '../src/auth';
import { verifyLoginError, verifyCheckoutError } from '../src/errors';
import { proceedToCheckout, fillCheckoutForm } from '../src/checkout';

test.describe('Error message tests on Saucedemo', () => {

  test('Error message for empty login fields', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.click('#login-button');
    await verifyLoginError(page, 'Epic sadface: Username is required');
  });

  test('Error message for empty password field', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.click('#login-button');
    await verifyLoginError(page, 'Epic sadface: Password is required');
  });

  test('Error message for invalid credentials', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'invalid_password');
    await page.click('#login-button');
    await verifyLoginError(page, 'Epic sadface: Username and password do not match any user in this service');
  });

  test('Error message for empty fields in checkout', async ({ page }) => {

    await login(page, 'standard_user', 'secret_sauce');
    await page.click('.inventory_item:has-text("Sauce Labs Backpack") >> button:has-text("Add to cart")');
    await proceedToCheckout(page);
    await page.click('#continue');
    await verifyCheckoutError(page, 'Error: First Name is required');
  });
});
