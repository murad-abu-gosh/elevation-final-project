import {test, expect, Browser, Page} from '@playwright/test';
import {chromium} from "playwright";

import {LoginComponent} from "../src/POM/LoginComponent";
import {LOGIN_EMAIL, LOGIN_PASSWORD} from "../terminal-x-config";

test.describe('Terminal X Login Page', () => {
    let browser: Browser;
    let page: Page;
    let loginPage: LoginComponent
    test.beforeAll(async () => {
        browser = await chromium.launch({headless: false});
    });
    test.beforeEach(async () => {
        page = await browser.newPage();
        loginPage = new LoginComponent(page)
        await page.goto(LoginComponent.url);

    });
    test.afterEach(async () => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });


    //Clear cookies and authentication
    test.use({storageState: {cookies: [], origins: []}});


    test('test valid login', async () => {
        await loginPage.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
        await page.waitForTimeout(7000)
        expect(await loginPage.getProfileName()).toEqual('khaled')

    });

    test('test invalid login', async () => {
        let errorAlertBox = page.locator("div[data-test-id='qa-login-error-toast']")
        await loginPage.fullLoginFlow("invalidlogin@gmail.com", "invalidpassword")

        await expect(errorAlertBox).toBeVisible()


    });
});