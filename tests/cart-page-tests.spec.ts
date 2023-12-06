import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';

import { chromium } from "playwright";
import { CartPage } from "../src/Logic/POM/CartPage";
import { LoginComponent } from "../src/Logic/POM/LoginComponent";
import { MiniCartComponent } from "../src/Logic/POM/MiniCartComponent";
import { Launcher } from '../src/Infra/Launcher';
import { ROOT_URL } from "../terminal-x-config";
import { ApiClient } from '../src/Infra/ApiClient';


test.describe('Cart Page and Mini-Cart Tests', async () => {
    let browser: Browser;
    let page: Page;
    let context: BrowserContext;
    let launcher: Launcher;
    let cartPage: CartPage
    let miniCartComponent: MiniCartComponent
    let API: ApiClient;
    test.beforeAll(async () => {
        launcher = new Launcher()
        browser = await launcher.launchBrowser()
    });
    test.beforeEach(async () => {
        test.setTimeout(60000)
        // page = await browser.newPage();
        // context = await launcher.NewContext()
        // page = await launcher.NewPage()
        API =new ApiClient()
        page = await browser.newPage();
        context = await launcher.NewContext()
        // page = await launcher.NewPage()

        await page.goto(CartPage.url,{waitUntil:'domcontentloaded'});
        cartPage = new CartPage(page)

    });
    test.afterEach(async () => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    test.describe.configure({ mode: 'serial' });


    test("remove first item from cart", async ({request}) => {
        test.setTimeout(60000)
        // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
        // await page.waitForLoadState('networkidle')
        const response = await API.AddToCartApi(request)
        await cartPage.reloadPage()
        // await cartPage.waitForCartPage()
        
        await cartPage.navigateToPage()


        //  await cartPage.waitForPageLoadNet()
        let itemsCountBeforeRemoval = Number(response["data"]["addAnyProductsToAnyCart"]["total_quantity"])
        await cartPage.fullRemoveFirstItemFlow()
        // await cartPage.waitForPageLoadNet()
        await page.waitForTimeout(4000)
        let itemsCountAfterRemoval = await cartPage.getCurrentItemsCount()
        // let itemsCountAfterRemoval = Number(response["data"]["addAnyProductsToAnyCart"]["total_quantity"])
        let expected = itemsCountBeforeRemoval - 1
    

        expect(itemsCountAfterRemoval).toEqual(expected)


    });


    // test("remove first item from mini-cart", async () => {
    //     // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
    //     miniCartComponent = new MiniCartComponent(page)
    //     await miniCartComponent.navigateToPage()
    //     // await page.waitForTimeout(4000)
    //     await miniCartComponent.waitForPageLoadNet()
    //     let itemsCountBeforeRemoval = await miniCartComponent.getCurrentItemsCount()
    //     await miniCartComponent.fullRemoveFirstItemFlow()
    //     await miniCartComponent.waitForPageLoadNet()
    //     let itemsCountAfterRemoval = await miniCartComponent.getCurrentItemsCount()

    //     let expected = itemsCountBeforeRemoval - 1
    //     expect(itemsCountAfterRemoval).toEqual(expected)


    // });

    test("navigate to shopping cart page", async () => {
        //Arrange
        // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
        // await page.waitForLoadState('networkidle')
        miniCartComponent = new MiniCartComponent(page)
        await miniCartComponent.navigateToPage()

        //Act
        await miniCartComponent.waitForPageLoadNet()
        await miniCartComponent.clickMiniCartWindow()
        await miniCartComponent.clickShoppingCartNavigateButton()
        ///await miniCartComponent.waitForPageLoadNet()
        // await page.waitForURL(`${ROOT_WEBSITE}/checkout/cart`)

        await cartPage.waitForCartPage()
        expect(page.url()).toEqual(cartPage.getCartPageUrl())
        //Assert
        // expect(page.url()).toEqual(`${ROOT_WEBSITE}/checkout/cart`)


    });
});