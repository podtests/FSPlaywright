import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://demo.evershop.io/account/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('akhiljda@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password');
  await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.locator('a').filter({ hasText: 'Nike react phantom run flyknit' }).click();
  await page.getByRole('link', { name: 'X' }).click();
  await page.getByRole('link', { name: 'X' }).click();
  await page.getByRole('link', { name: 'Green' }).click();
});