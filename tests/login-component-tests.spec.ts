import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import { chromium } from "playwright";

import { LoginComponent } from "../src/Logic/POM/LoginComponent";
import { INVALID_LOGIN_EMAIL, INVALID_LOGIN_PASSWORD, LOGIN_EMAIL, LOGIN_PASSWORD, PROFILE_NAME } from "../terminal-x-config";
import { Launcher } from '../src/Infra/Launcher';
import { ApiClient } from '../src/Infra/ApiClient';
import { InvalidloginRoot } from '../src/Logic/HttpResponseBody/Response_InvaildLogin';

const authFile = 'playwright/.auth/user.json';
test.describe('Terminal X Login Page', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let launcher: Launcher;
    let LoginWithApi: ApiClient;
    let loginPage: LoginComponent
    test.beforeAll(async () => {

        launcher = new Launcher()
        browser = await launcher.launchBrowser()
    });
    test.beforeEach(async () => {
        test.setTimeout(60000)
        page = await browser.newPage();
        context = await launcher.NewContext()
        // page = await launcher.NewPage()
        LoginWithApi = new ApiClient();
        loginPage = new LoginComponent(page)
        await page.goto(LoginComponent.url);

    });
    test.afterEach(async () => {

        // const name = await loginPage.getProfileNameNoWait();
        // if (name != PROFILE_NAME) {
        //     await loginPage.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
        // }
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });





    test('test valid login', async () => {


        await loginPage.waitForPageLoadNet();
        expect(await loginPage.getProfileName()).toEqual(PROFILE_NAME)

    });

    test('test invalid login', async ({ request }) => {
        await loginPage.waitForPageLoadNet()
         
        const result = await LoginWithApi.loginApi(request, INVALID_LOGIN_EMAIL, INVALID_LOGIN_PASSWORD);
        const resultBody:InvalidloginRoot = <InvalidloginRoot> result 
        const errorMessage = resultBody.errors[0]?.message;
        expect(errorMessage).toEqual("משתמש או סיסמה שגויים.")


    });
});