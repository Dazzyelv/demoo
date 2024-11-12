import { Page } from 'playwright';

export async function login(page: Page, username: string, password: string) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
}

export async function verifyLoginSuccess(page: Page) {
  await page.waitForSelector('.inventory_list'); 
}

export async function verifyLoginFailure(page: Page) {
  await page.waitForSelector('[data-test="error"]'); 
}
