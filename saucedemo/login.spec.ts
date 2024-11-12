import { test, expect } from '@playwright/test';
import { login, verifyLoginSuccess, verifyLoginFailure } from '../src/auth';

test.describe('Login tests on Saucedemo', () => {

  test('Successful login', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await verifyLoginSuccess(page);
  });

  test('Failed login with invalid credentials', async ({ page }) => {
    await login(page, 'invalid_user', 'wrong_password');
    await verifyLoginFailure(page);
    const errorMessage = await page.textContent('[data-test="error"]');
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('Failed login with empty credentials', async ({ page }) => {
    await login(page, '', '');
    await verifyLoginFailure(page);
    const errorMessage = await page.textContent('[data-test="error"]');
    expect(errorMessage).toContain('Username is required');
  });
});
