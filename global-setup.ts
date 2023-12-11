import { chromium } from "@playwright/test";

async function globalSetup(){
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://demoqa.com/login");
    await page.getByPlaceholder('Username').fill('michald');
    await page.getByPlaceholder('Password').fill('P@ssw0rd#8$E!');
    await page.getByRole('button', {name: 'Login'}).click();

    await page.waitForURL('https://demoqa.com/profile')

    await page.context().storageState({ path: './loginAuth.json'});
    
    console.log(await page.context().storageState());
    await browser.close();

}

export default globalSetup;