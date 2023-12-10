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
        API =new ApiClient()
        page = await browser.newPage();
        context = await launcher.NewContext()

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

        const response = await API.AddToCartApi(request)
        await cartPage.reloadPage()

        await cartPage.navigateToPage()
        let itemsCountBeforeRemoval = Number(response["data"]["addAnyProductsToAnyCart"]["total_quantity"])
        await cartPage.fullRemoveFirstItemFlow()
        await cartPage.waitForEmptyCart()
        let itemsCountAfterRemoval = await cartPage.getCurrentItemsCount()
        let expected = itemsCountBeforeRemoval - 1
    

        expect(itemsCountAfterRemoval).toEqual(expected)


    });


    test("remove first item from mini-cart", async ({request}) => {
        const response = await API.AddToCartApi(request)
        miniCartComponent = new MiniCartComponent(page)
        await miniCartComponent.navigateToPage()
        await cartPage.reloadPage()
        let itemsCountBeforeRemoval = await miniCartComponent.getCurrentItemsCount()
        await miniCartComponent.fullRemoveFirstItemFlow()
        await cartPage.reloadPage()
        let itemsCountAfterRemoval = await miniCartComponent.getCurrentItemsCount()

        let expected = itemsCountBeforeRemoval - 1
        expect(itemsCountAfterRemoval).toEqual(expected)


    });

    test("navigate to shopping cart page", async () => {
        //Arrange
        miniCartComponent = new MiniCartComponent(page)

        //Act
        await cartPage.navigateToPage()

        //Assert
        expect(page.url()).toEqual(cartPage.getCartPageUrl())


    });
});