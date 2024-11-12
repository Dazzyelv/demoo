import { test, expect } from '@playwright/test';
import { login } from '../src/auth';

test.describe('Mobile view tests on Saucedemo', () => {

  test.use({
    viewport: { width: 360, height: 800 }, 
    userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-S901B Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.71 Mobile Safari/537.36',
  });

  test('Mobile layout and login test on Samsung Galaxy S22', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('#user-name')).toBeVisible();  
    await expect(page.locator('#password')).toBeVisible();  
    await expect(page.locator('#login-button')).toBeVisible();  

   
    await login(page, 'standard_user', 'secret_sauce');

   
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test.use({
    viewport: { width: 390, height: 844 }, 
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
  });

  test('Mobile layout and login test on iPhone 15', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('#user-name')).toBeVisible();  
    await expect(page.locator('#password')).toBeVisible();  
    await expect(page.locator('#login-button')).toBeVisible();  
    await login(page, 'standard_user', 'secret_sauce');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

});
