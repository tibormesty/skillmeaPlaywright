import test, { expect } from '../fixtures/basePages';
 
test.describe('Home page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
  })

  test('Verify home title', async ({ page, loginPage, homePage }) => {
    await loginPage.login();
    await expect(homePage.title).toBeVisible();
  });

  test('Verify add to cart functionality', async ({ page, loginPage, homePage }) => {
    await loginPage.login();
    await homePage.clickOnAddToCart();
    await expect(homePage.cartBadge).toHaveText("1");
  });
})