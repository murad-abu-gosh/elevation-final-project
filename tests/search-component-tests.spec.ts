import {test, expect, Browser, Page} from '@playwright/test';
import {describe} from "node:test";
import {chromium} from "playwright";
import {LoginComponent} from "../src/POM/LoginComponent";
import {SearchComponent} from "../src/POM/SearchComponent";
import {LOGIN_EMAIL, LOGIN_PASSWORD} from "../terminal-x-config";

describe('Search Component Tests', async () => {
    let browser: Browser;
    let page: Page;
    let searchComponent: SearchComponent
    let loginComponent: LoginComponent
    test.beforeAll(async () => {
        browser = await chromium.launch({headless: false});
    });
    test.beforeEach(async () => {
        page = await browser.newPage();
        searchComponent = new SearchComponent(page)
        loginComponent = new LoginComponent(page)
        await page.goto(SearchComponent.url);

    });
    test.afterEach(async () => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    const testData = ["nike", "adidas", "puma"]
    for (const data of testData) {
        test(`test search navigation for: ${data}`, async () => {

            await searchComponent.fullSearchFlow(data)
            await page.waitForLoadState('networkidle')
            await page.waitForURL(`https://www.terminalx.com/catalogsearch/result/?q=${data}`)
            expect(page.url()).toEqual(`https://www.terminalx.com/catalogsearch/result/?q=${data}`)


        });
    }

})