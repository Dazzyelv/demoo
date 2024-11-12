import { Page, expect } from 'playwright/test';


export async function sortBy(page: Page, criteria: string) {
  await page.selectOption('.product_sort_container', criteria);
}


export async function verifySortedByPriceLowToHigh(page: Page) {
  const prices = await page.$$eval('.inventory_item_price', elements =>
    elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
  );
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
}


export async function verifySortedByPriceHighToLow(page: Page) {
  const prices = await page.$$eval('.inventory_item_price', elements =>
    elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
  );
  const sortedPrices = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sortedPrices);
}


export async function verifySortedByNameAtoZ(page: Page) {
  const names = await page.$$eval('.inventory_item_name', elements =>
    elements.map(el => el.textContent || '')
  );
  const sortedNames = [...names].sort();
  expect(names).toEqual(sortedNames);
}


export async function verifySortedByNameZtoA(page: Page) {
  const names = await page.$$eval('.inventory_item_name', elements =>
    elements.map(el => el.textContent || '')
  );
  const sortedNames = [...names].sort().reverse();
  expect(names).toEqual(sortedNames);
}
