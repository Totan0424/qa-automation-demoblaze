import { test, expect } from '@playwright/test';

test('Successful login on DemoBlaze', async ({ page }) => {

  await page.goto('/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('admin');
  await page.locator('#loginpassword').fill('admin');

  await page.getByRole('button', { name: 'Log in' }).click();
  
  await expect(await page.getByText('Welcome admin')).toBeVisible();
});

test('Login Failed on DemoBlaze', async ({ page }) => {

    await page.goto('/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('incorrect_user');
    await page.locator('#loginpassword').fill('wrong_password');

    await page.getByRole('button', { name: 'Log in' }).click();
    

    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('User does not exist.');
        
    });


  });


