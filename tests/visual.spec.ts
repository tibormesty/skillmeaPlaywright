import test, { expect } from '../fixtures/basePages';

test.describe('Visual testing', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
  })

  test('Visual test - login page', async ({ page }) => {
    await expect(page).toHaveScreenshot({ maxDiffPixels: 200 });
  });

})
