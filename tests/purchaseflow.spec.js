import { test, expect } from '@playwright/test';

test.describe('Add, Validate, and Checkout Product on DemoBlaze', () => {
  
  test('Add product to cart, validate price, and remove product', async ({ page }) => {
    
    await page.goto('https://www.demoblaze.com');
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    const productTitle = await page.locator('.name').textContent();
    expect(productTitle).toBe('Samsung galaxy s6');

    const productPrice = await page.locator('.price-container').textContent();
    const expectedPrice = productPrice.match(/\d+/)[0];

    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click();

    
    await page.waitForSelector('tr.success');
    const cartProductTitle = await page.locator('tr.success td:nth-child(2)').textContent();
    const cartProductPrice = await page.locator('tr.success td:nth-child(3)').textContent();

    expect(cartProductTitle).toBe('Samsung galaxy s6');
    expect(cartProductPrice).toBe(expectedPrice);

    
    await page.locator('a', { hasText: 'Delete' }).click();

    await page.waitForTimeout(2000);
    const cartRows = await page.locator('tr.success').count();
    expect(cartRows).toBe(0);

    console.log('Product added, validated, and removed successfully.');
  });

  
  test('Checkout process on DemoBlaze', async ({ page }) => {
    
    await page.goto('https://www.demoblaze.com');

    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    const productTitle = await page.locator('.name').textContent();
    expect(productTitle).toBe('Samsung galaxy s6');

    await page.getByRole('link', { name: 'Add to cart' }).click();

    await page.getByRole('link', { name: 'Cart', exact: true }).click();

    const cartProductTitle = await page.locator('tr.success td:nth-child(2)').textContent();
    expect(cartProductTitle).toBe('Samsung galaxy s6');

    await page.locator('button', { hasText: 'Place Order' }).click();

    await page.locator('#name').fill('Totan Garro');
    await page.locator('#country').fill('COLOMBIA');
    await page.locator('#city').fill('Envigado');
    await page.locator('#card').fill('4111111111111111');
    await page.locator('#month').fill('12');
    await page.locator('#year').fill('2026');

    await page.getByRole('button', { name: 'Purchase' }).click();

    const confirmationMessage = await page.locator('.sweet-alert h2').textContent();
    expect(confirmationMessage).toBe('Thank you for your purchase!');

    await page.getByRole('button', { name: 'OK' }).click();

    console.log('Checkout completed successfully!');
  });
});
