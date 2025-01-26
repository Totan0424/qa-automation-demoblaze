import { test, expect } from '@playwright/test';

test.describe('Update Product Quantity and Validate Total Price', () => {
  test('Add product multiple times and verify total price in cart', async ({ page }) => {
    
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    
    await page.goto('https://www.demoblaze.com');
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    const productPriceText = await page.locator('.price-container').textContent();
    const unitPrice = parseInt(productPriceText.match(/\d+/)[0], 10);
    console.log(`Unit price of Samsung galaxy s6: $${unitPrice}`);

    const quantity = 3;
    for (let i = 0; i < quantity; i++) {
      await page.getByRole('link', { name: 'Add to cart' }).click();

      await page.waitForTimeout(500);
    }

    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await page.waitForSelector('#tbodyid > tr');

    const cartRows = await page.locator('#tbodyid > tr').count();
    console.log(`Cart rows: ${cartRows}`);
    expect(cartRows).toBe(quantity);

    
    const totalPriceText = await page.locator('#totalp').textContent();
    const totalPrice = parseInt(totalPriceText, 10); 

    
    const expectedTotal = unitPrice * quantity;
    console.log(`Expected Total: $${expectedTotal}, Received Total: $${totalPrice}`);

    expect(totalPrice).toBe(expectedTotal);

    console.log('Validation Passed: Total price is correctly calculated.');
  });
});
