 import { test as setup } from "@playwright/test";

 let adminUsername = "admin_user";
 let adminPassword  = "Admin!123";
 const adminAuthFile = ".auth/admin.json";

 let userName = "user_user";
 let userPassword  = "User!123";
 const userAuthFile = ".auth/user.json";

 setup("Create Admin Auth", async ({ page, context}) => {
    await page.goto("https://demoqa.com/login");
    await page.getByPlaceholder("UserName").fill(adminUsername);
    await page.getByPlaceholder("Password").fill(adminPassword);
    await page.getByRole("button", { name: "Login"}).click();

    await page.waitForURL("https://demoqa.com/profile");

    await context.storageState({ path: adminAuthFile});
 });


 setup("Create User Auth", async ({ page, context}) => {
    await page.goto("https://demoqa.com/login");
    await page.getByPlaceholder("UserName").fill(userName);
    await page.getByPlaceholder("Password").fill(userPassword);
    await page.getByRole("button", { name: "Login"}).click();

    await page.waitForURL("https://demoqa.com/profile");

    await context.storageState({ path: userAuthFile});
 });