import {test, expect, Browser, Page, BrowserContext} from '@playwright/test';
import {chromium} from "playwright";

import {LoginComponent} from "../src/Logic - POM/LoginComponent";
import {LOGIN_EMAIL, LOGIN_PASSWORD, PROFILE_NAME} from "../terminal-x-config";
import {Launcher} from '../src/Infra/Launcher';


test.describe('Terminal X Login Page', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let launcher: Launcher;

    let loginPage: LoginComponent
    test.beforeAll(async () => {
        // browser = await chromium.launch({headless: false});
        // browser = await chromium.launch();
        launcher = new Launcher()
        browser = await launcher.launchBrowser()
    });
    test.beforeEach(async () => {
        // page = await browser.newPage();
        context = await launcher.NewContext()
        page = await launcher.NewPage()
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
        await loginPage.waitForPageLoad()
        expect(await loginPage.getProfileName()).toEqual(PROFILE_NAME)

    });

    test('test invalid login', async () => {
        await loginPage.fullLoginFlow("invalidlogin@gmail.com", "invalidpassword")
        expect(loginPage.getAlertBox()).toBeTruthy()


    });
});