// import {test, expect, Browser, Page} from '@playwright/test';
// import {chromium} from "playwright";
// import {MiniCartComponent} from "../src/POM/MiniCartComponent";
// import {LoginComponent} from "../src/POM/LoginComponent";
// import {LOGIN_EMAIL, LOGIN_PASSWORD} from "../terminal-x-config";
//
// test.describe('Terminal X Mini-Cart Tests', async () => {
//     let browser: Browser;
//     let page: Page;
//     let miniCartComponent: MiniCartComponent
//     let loginComponent: LoginComponent
//     test.beforeAll(async () => {
//         //browser = await chromium.launch({headless: false});
//         browser = await chromium.launch();
//
//     });
//     test.beforeEach(async () => {
//         page = await browser.newPage();
//         miniCartComponent = new MiniCartComponent(page)
//         loginComponent = new LoginComponent(page)
//         await page.goto(MiniCartComponent.url);
//
//     });
//     test.afterEach(async () => {
//         await page.close();
//     });
//     test.afterAll(async () => {
//         await browser.close();
//     });
//
//     test("remove first item from mini-cart", async () => {
//         // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
//
//
//         await page.waitForLoadState('networkidle')
//         let itemsCountBeforeRemoval = +await miniCartComponent.getCurrentItemsCount()
//         await miniCartComponent.fullRemoveFirstItemFlow()
//         await page.waitForTimeout(4000)
//         let itemsCountAfterRemoval = +await miniCartComponent.getCurrentItemsCount()
//
//         let expected = itemsCountBeforeRemoval - 1
//         expect(itemsCountAfterRemoval).toEqual(expected)
//
//
//     });
//
//     test("navigate to shopping cart page", async () => {
//         //Arrange
//         // await loginComponent.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
//         // await page.waitForLoadState('networkidle')
//
//         //Act
//         await page.waitForLoadState('networkidle')
//         await miniCartComponent.clickMiniCartWindow()
//         await miniCartComponent.clickShoppingCartNavigateButton()
//         await page.waitForLoadState('networkidle')
//         await page.waitForURL('https://www.terminalx.com/checkout/cart')
//
//
//         //Assert
//         expect(page.url()).toEqual('https://www.terminalx.com/checkout/cart')
//
//
//     });
//
//
// });