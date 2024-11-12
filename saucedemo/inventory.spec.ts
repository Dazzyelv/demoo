import { test, expect } from '@playwright/test';
import { login } from '../src/auth';
import { sortBy, verifySortedByPriceLowToHigh, verifySortedByPriceHighToLow, verifySortedByNameAtoZ, verifySortedByNameZtoA } from '../src/inventory';

test.describe('Product sorting tests on Saucedemo', () => {

  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
  });

  test('Sort products by price (low to high)', async ({ page }) => {
    await sortBy(page, 'lohi'); 
    await verifySortedByPriceLowToHigh(page); 
  });

  test('Sort products by price (high to low)', async ({ page }) => {
    await sortBy(page, 'hilo');  
    await verifySortedByPriceHighToLow(page);  
  });

  test('Sort products by name (A to Z)', async ({ page }) => {
    await sortBy(page, 'az'); 
    await verifySortedByNameAtoZ(page); 
  });

  test('Sort products by name (Z to A)', async ({ page }) => {
    await sortBy(page, 'za'); 
    await verifySortedByNameZtoA(page);  
  });
});
