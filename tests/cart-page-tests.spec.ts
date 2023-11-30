import {test, expect, Browser, Page} from '@playwright/test';
import {describe} from "node:test";
import {chromium} from "playwright";
import {LOGIN_EMAIL, LOGIN_PASSWORD} from "../terminal-x-config";
import {CartPage} from "../src/POM/CartPage";
import {LoginComponent} from "../src/POM/LoginComponent";
import {MiniCartComponent} from "../src/POM/MiniCartComponent";

describe('Cart Page Tests', async () => {
    let browser: Browser;
    let page: Page;
    let cartPage: CartPage
    let loginComponent: LoginComponent
    test.beforeAll(async () => {
        browser = await chromium.launch({headless: false});
    });
    test.beforeEach(async () => {
        page = await browser.newPage();
        cartPage = new CartPage(page)
        loginComponent = new LoginComponent(page)
        await page.goto(CartPage.url);

    });
    test.afterEach(async () => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    test("remove first item from cart", async () => {
        // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
        // await page.waitForLoadState('networkidle')
        await page.goto(CartPage.url, { waitUntil: 'domcontentloaded' })
        let itemsCountBeforeRemoval = + await cartPage.getCurrentItemsCount()
        await cartPage.fullRemoveFirstItemFlow()
        await page.waitForTimeout(4000)
        let itemsCountAfterRemoval = + await cartPage.getCurrentItemsCount()

        let expected = itemsCountBeforeRemoval - 1
        expect(itemsCountAfterRemoval).toEqual(expected)


    });
});