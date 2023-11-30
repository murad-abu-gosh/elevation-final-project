// auth.setup.ts
import { expect, test as setup } from '@playwright/test';
import {LoginComponent} from '../src/POM/LoginComponent';
import {LOGIN_EMAIL, LOGIN_PASSWORD} from "../terminal-x-config";

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(LoginComponent.url);
    let loginComp = new LoginComponent(page)
    await loginComp.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
    // Wait until the page receives the cookies.
    await page.waitForLoadState("networkidle")
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    // await page.waitForURL('https://www.pokellector.com/my-account');
    await page.goto(LoginComponent.url, { waitUntil: 'domcontentloaded' });
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    // await expect(page.locator('//h1[@class="post-title"]')).toBeVisible();

    // End of authentication steps.
    expect.soft(await loginComp.getProfileName()).toEqual('khaled');

    await page.context().storageState({ path: authFile });


});