import { test, expect } from '@playwright/test';

test('Verify Categories on DemoBlaze', async ({ page }) => {    
    await page.goto('/');

    const phonesCategory = page.locator('a', { hasText: 'Phones' });
    await expect(phonesCategory).toBeVisible();

    const laptopsCategory = page.locator('a', { hasText: 'Laptops' });
    await expect(laptopsCategory).toBeVisible();

    const monitorsCategory = page.locator('a', { hasText: 'Monitors' });
    await expect(monitorsCategory).toBeVisible();

    console.log('All categories are visible!');
});


test.describe('Validate categories display correct products', () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/');
  });

  test('Validate Phones category', async ({ page }) => {
    
    await page.locator('a', { hasText: 'Phones' }).click();
    await page.waitForSelector('.card-title');

    const productTitles = (await page.locator('.card-title').allTextContents()).map(title => title.trim());

    const expectedPhones = ['Samsung galaxy s6', 'Nokia lumia 1520', 'Nexus 6', 
      'Samsung galaxy s7', 'Iphone 6 32gb', 'Sony xperia z5', 'HTC One M9'];
    
    expect(productTitles).toEqual(expect.arrayContaining(expectedPhones));
  });

  test('Validate Laptops category', async ({ page }) => {
    
    await page.locator('a', { hasText: 'Laptops' }).click();
    await page.waitForSelector('.card-title');
    await page.waitForTimeout(2000);

    
    const productTitles = await page.locator('.card-title').allTextContents();
    const expectedLaptops = ['Sony vaio i5', 'Sony vaio i7\n', 'MacBook air', 'Dell i7 8gb', '2017 Dell 15.6 Inch', 'MacBook Pro'];
    
    expect(productTitles).toEqual(expect.arrayContaining(expectedLaptops));

  });

  test('Validate Monitors category', async ({ page }) => {
    
    await page.locator('a', { hasText: 'Monitors' }).click();
    await page.waitForSelector('.card-title');
    await page.waitForTimeout(2000);

    const productTitles = await page.locator('.card-title').allTextContents();
    
    const expectedMonitors = ['Apple monitor 24', 'ASUS Full HD'];
    
    expect(productTitles).toEqual(expect.arrayContaining(expectedMonitors));
  });
});
