import test, { expect } from '../fixtures/basePages';

test.describe('Upload', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
  })

  test('Upload file', async ({ page }) => {
    await page.locator('#uploadFile').setInputFiles(['./skillmea.svg']);
    await expect(page.locator('#uploadedFilePath')).toBeVisible();
  });
})
