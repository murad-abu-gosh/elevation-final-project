// auth.setup.ts
import { expect, test as setup } from '@playwright/test';
import {LoginPage} from './src/POM/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(LoginPage.url);
    await page.locator('//input[@name="username"]').fill('elevation');
    await page.locator('//input[@name="password"]').fill('elevationtester');
    await page.locator('//button[@type="submit"]').click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    // await page.waitForURL('https://www.pokellector.com/my-account');
    await page.goto('https://www.pokellector.com/my-collection', { waitUntil: 'domcontentloaded' });
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    // await expect(page.locator('//h1[@class="post-title"]')).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});