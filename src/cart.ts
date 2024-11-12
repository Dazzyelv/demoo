import { Page, expect } from 'playwright/test';


export async function addItemToCart(page: Page, itemName: string) {
  const item = await page.locator(`.inventory_item:has-text("${itemName}")`);
  const addToCartButton = item.locator('button:has-text("Add to cart")');
  await addToCartButton.click();
}

export async function verifyItemInCart(page: Page, itemName: string) {
  await page.click('.shopping_cart_link');  
  const cartItem = await page.locator(`.cart_item:has-text("${itemName}")`);
  await expect(cartItem).toBeVisible();  
}


export async function removeItemFromCart(page: Page, itemName: string) {

    const item = await page.locator(`.cart_item:has-text("${itemName}")`);
    await expect(item).toBeVisible(); 
    
 
    const removeButton = item.locator('button:has-text("Remove")');
    await expect(removeButton).toBeVisible(); 
    await removeButton.click(); 
  }

export async function verifyCartIsEmpty(page: Page) {
  await page.click('.shopping_cart_link');
  const cartItems = await page.locator('.cart_item');
  await expect(cartItems).toHaveCount(0);  
}
