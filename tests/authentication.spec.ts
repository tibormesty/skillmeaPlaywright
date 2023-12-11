import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/login');
});

test.describe('Authenticaton', () => {
    test.skip('Successful login', async ({ page }) => {
        await page.getByText('michald').isVisible();
        expect(page.getByRole('button', { name: 'Log out'})).toBeVisible();
    });
});