import test, { expect } from '../fixtures/basePages';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
  })

  test('Successful login', async ({ page, loginPage, browserName }) => {
    test.skip(browserName === 'firefox', 'Still working on it.')
    await loginPage.login();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
  
  test('Cannot login with valid username and invalid password @slow', async ({ page, loginPage }) => {
    test.info().annotations.push({
      type: 'Test',
      description: 'This test will pass if the user is not able to login with valid username and invalid password.'
    });
    await test.step('Enter valid username', async () => {
      await loginPage.enterValidUsername();
    });
    await test.step('Enter invalid password', async () => {
      await loginPage.enterInvalidPassword();
    });
    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
    await test.step('Verify invalid credentials error message', async () => {
      await expect(loginPage.invalidCredentialsErrorMessage, 'Can not find login error message.').toBeVisible();
    });
  });
  
  test('Cannot login with invalid username and valid password @slow', async ({ page, loginPage }) => {
    await loginPage.enterInvalidUsername();
    await loginPage.enterValidPassword();
    // await loginPage.clickLoginButton();
    await expect(loginPage.invalidCredentialsErrorMessage).toBeVisible();
  });
  
  test('Cannot login with blank fields @fast', async ({ page, loginPage }) => {
    await loginPage.clickLoginButton();
    await expect(loginPage.requiredCredentialsErrorMessage).toBeVisible();
  });
  
  test('Cannot login with locked out user', async ({ page, loginPage }) => {
    await loginPage.enterLockedOutUser();
    await loginPage.enterValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.lockedOutErrorMessage).toBeVisible();
  });
})
