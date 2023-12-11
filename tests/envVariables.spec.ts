import { test } from '@playwright/test';

test.only('Multiple envs', async ({ page }) => {

    console.log(process.env.URL);
    console.log(process.env.USER);
    console.log(process.env.PASSWORD);
});