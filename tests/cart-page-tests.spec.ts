import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';

import { chromium } from "playwright";
import { CartPage } from "../src/Logic/POM/CartPage";
import { LoginComponent } from "../src/Logic/POM/LoginComponent";
import { MiniCartComponent } from "../src/Logic/POM/MiniCartComponent";
import { Launcher } from '../src/Infra/Launcher';
import { ROOT_URL } from "../terminal-x-config";


test.describe('Cart Page and Mini-Cart Tests', async () => {
    let browser: Browser;
    let page: Page;
    let context: BrowserContext;
    let launcher: Launcher;
    let cartPage: CartPage
    let loginComponent: LoginComponent
    let miniCartComponent: MiniCartComponent

    test.beforeAll(async () => {
        // browser = await chromium.launch({headless: false});
        launcher = new Launcher()
        // browser = await chromium.launch();
        browser = await launcher.launchBrowser()
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


        await cartPage.navigateToPage()
        await cartPage.waitForPageLoadNet()
        let itemsCountBeforeRemoval = await cartPage.getCurrentItemsCount()
        await cartPage.fullRemoveFirstItemFlow()
        await cartPage.waitForPageLoadNet()
        await page.waitForTimeout(4000)
        let itemsCountAfterRemoval = await cartPage.getCurrentItemsCount()

        let expected = itemsCountBeforeRemoval - 1

        expect(itemsCountAfterRemoval).toEqual(expected)


    });


    test("remove first item from mini-cart", async () => {
        // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)

        await miniCartComponent.navigateToPage()
        // await page.waitForTimeout(4000)
        await miniCartComponent.waitForPageLoadNet()
        let itemsCountBeforeRemoval = await miniCartComponent.getCurrentItemsCount()
        await miniCartComponent.fullRemoveFirstItemFlow()
        await miniCartComponent.waitForPageLoadNet()
        let itemsCountAfterRemoval = await miniCartComponent.getCurrentItemsCount()

        let expected = itemsCountBeforeRemoval - 1
        expect(itemsCountAfterRemoval).toEqual(expected)


    });

    test("navigate to shopping cart page", async () => {
        //Arrange
        // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
        // await page.waitForLoadState('networkidle')
        await miniCartComponent.navigateToPage()

        //Act
        await miniCartComponent.waitForPageLoadNet()
        await miniCartComponent.clickMiniCartWindow()
        await miniCartComponent.clickShoppingCartNavigateButton()
        await miniCartComponent.waitForPageLoadNet()
        // await page.waitForURL(`${ROOT_WEBSITE}/checkout/cart`)

        await cartPage.waitForCartPage()
        expect(page.url()).toEqual(cartPage.getCartPageUrl())
        //Assert
        // expect(page.url()).toEqual(`${ROOT_WEBSITE}/checkout/cart`)


    });
});