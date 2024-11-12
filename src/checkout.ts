import { Page, expect } from 'playwright/test';
import { faker } from '@faker-js/faker';


export async function proceedToCheckout(page: Page) {
  await page.click('.shopping_cart_link');  
  await page.click('#checkout'); 
}


export async function fillCheckoutForm(page: Page) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const postalCode = faker.address.zipCode();


  await page.fill('#first-name', firstName);
  await page.fill('#last-name', lastName);
  await page.fill('#postal-code', postalCode);

  
  await page.click('#continue');
}


export async function confirmOrder(page: Page) {
  await page.click('#finish');  
}


export async function verifyOrderSuccess(page: Page) {
  const successMessage = await page.locator('.complete-header');
  await expect(successMessage).toHaveText('Thank you for your order!');  
}
