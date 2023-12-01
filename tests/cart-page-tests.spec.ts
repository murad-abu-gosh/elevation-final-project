import {test, expect, Browser, Page, BrowserContext} from '@playwright/test';
import {describe} from "node:test";
import {chromium} from "playwright";
import {CartPage} from "../src/Logic - POM/CartPage";
import {LoginComponent} from "../src/Logic - POM/LoginComponent";
import {MiniCartComponent} from "../src/Logic - POM/MiniCartComponent";
import { Launcher } from '../src/Infra/Launcher';

describe('Cart Page and Mini-Cart Tests', async () => {
    let browser: Browser;
    let page: Page;
    let context:BrowserContext;
    let launcher:Launcher;
    let cartPage: CartPage
    let loginComponent: LoginComponent
    let miniCartComponent: MiniCartComponent

    test.beforeAll(async () => {
        // browser = await chromium.launch({headless: false});
        launcher = new Launcher()
        // browser = await chromium.launch();
        browser=await launcher.launchBrowser()
    });
    test.beforeEach(async () => {
        // page = await browser.newPage();
        context = await launcher.NewContext()
        page = await launcher.NewPage()
        cartPage = new CartPage(page)
        loginComponent = new LoginComponent(page)
        miniCartComponent = new MiniCartComponent(page)
    });
    test.afterEach(async () => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    test.describe.configure({ mode: 'serial' });


    test("remove first item from cart", async () => {
        // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
        // await page.waitForLoadState('networkidle')
        await page.goto(CartPage.url, { waitUntil: 'domcontentloaded' })
        await page.waitForLoadState("networkidle")
        let itemsCountBeforeRemoval = + await cartPage.getCurrentItemsCount()
        await cartPage.fullRemoveFirstItemFlow()
        await page.waitForTimeout(4000)
        let itemsCountAfterRemoval = + await cartPage.getCurrentItemsCount()

        let expected = itemsCountBeforeRemoval - 1
        expect(itemsCountAfterRemoval).toEqual(expected)


    });


    test("remove first item from mini-cart", async () => {
        // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)

        await page.goto(MiniCartComponent.url, { waitUntil: 'domcontentloaded' })
        // await page.waitForTimeout(4000)
        await page.waitForLoadState('networkidle')
        let itemsCountBeforeRemoval = +await miniCartComponent.getCurrentItemsCount()
        await miniCartComponent.fullRemoveFirstItemFlow()
        await page.waitForTimeout(4000)
        let itemsCountAfterRemoval = +await miniCartComponent.getCurrentItemsCount()

        let expected = itemsCountBeforeRemoval - 1
        expect(itemsCountAfterRemoval).toEqual(expected)


    });

    test("navigate to shopping cart page", async () => {
        //Arrange
        // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
        // await page.waitForLoadState('networkidle')
        await page.goto(MiniCartComponent.url, { waitUntil: 'domcontentloaded' })

        //Act
        await page.waitForLoadState('networkidle')
        await miniCartComponent.clickMiniCartWindow()
        await miniCartComponent.clickShoppingCartNavigateButton()
        await page.waitForLoadState('networkidle')
        await page.waitForURL('https://www.terminalx.com/checkout/cart')


        //Assert
        expect(page.url()).toEqual('https://www.terminalx.com/checkout/cart')


    });
});