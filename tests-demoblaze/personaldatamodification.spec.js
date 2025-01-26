 /* The https://www.demoblaze.com site does not have full user registration or login functionality to handle 
    changes to personal data such as name, email or address. To simulate a flow where a user could modify their
    personal data and verify that the changes persist, I did so based on existing functionality, simulating 
    expected behavior (using the cart dialog box or checkout form).*/

    import { test, expect } from '@playwright/test';

    test.describe('Simulate user data modification and persistence on DemoBlaze', () => {
      test('Modify and verify user data persistence', async ({ page }) => {
        
        await page.goto('https://www.demoblaze.com');
    
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
        await page.getByRole('link', { name: 'Add to cart' }).click();
    
        page.on('dialog', async (dialog) => {
          await dialog.accept();
        });
    
        await page.getByRole('link', { name: 'Cart', exact: true }).click();
    
        await page.locator('button', { hasText: 'Place Order' }).click();
    
        const userData = {
          name: 'Totan Test',
          country: 'COLOMBIA',
          city: 'Envigado',
          card: '4111111111111111',
          month: '12',
          year: '2026',
        };
    
        await page.locator('#name').fill(userData.name);
        await page.locator('#country').fill(userData.country);
        await page.locator('#city').fill(userData.city);
        await page.locator('#card').fill(userData.card);
        await page.locator('#month').fill(userData.month);
        await page.locator('#year').fill(userData.year);
    
        await page.getByLabel('Place order').getByText('Close').click();
    
        await page.locator('button', { hasText: 'Place Order' }).click();
    
        expect(await page.locator('#name').inputValue()).toBe(userData.name);
        expect(await page.locator('#country').inputValue()).toBe(userData.country);
        expect(await page.locator('#city').inputValue()).toBe(userData.city);
        expect(await page.locator('#card').inputValue()).toBe(userData.card);
        expect(await page.locator('#month').inputValue()).toBe(userData.month);
        expect(await page.locator('#year').inputValue()).toBe(userData.year);
    
        console.log('User data modification and persistence verified successfully.');
      });
    });
    