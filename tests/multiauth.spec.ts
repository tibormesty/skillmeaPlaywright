import { test, expect } from "@playwright/test";

test.use({ storageState: '.auth/user.json'});
test.describe('Home page user', () => {
    test('Verify sccessful user login', async ({ page }) => {
        await page.goto('https://demoqa.com/login');`` 
        await page.getByText('user_user').isVisible();
        expect(page.getByRole('button', {name: 'Log Out'})).toBeVisible();
    });
})



test.use({ storageState: '.auth/admin.json'});
test.describe('Home page admin', () => {
    test('Verify sccessful admin login', async ({ page }) => {
        await page.goto('https://demoqa.com/login');
        await page.getByText('admin_user').isVisible();
        expect(page.getByRole('button', {name: 'Log Out'})).toBeVisible();
    });
})