import {test, expect, Browser, Page, BrowserContext, APIRequestContext} from '@playwright/test';
import {Launcher} from "../src/Infra/Launcher";
import {WishlistPage} from "../src/Logic/POM/WishlistPage";
import {EMPTY_WISHLIST_WARNING_TEXT} from "../terminal-x-config";
import {ProductDisplayPage} from "../src/Logic/POM/ProductsDisplayPage";
import {ApiClient} from "../src/Infra/ApiClient";

test.describe('Terminal X Wish List Page Tests', async () => {
    let browser: Browser;
    let page: Page;
    let context: BrowserContext;
    let launcher: Launcher;
    let wishlistPage: WishlistPage
    let productPage: ProductDisplayPage
    let apiClient: ApiClient


    test.beforeAll(async () => {
        launcher = new Launcher()
        browser = await launcher.launchBrowser()
    });
    test.beforeEach(async () => {
        context = await launcher.NewContext()
        page = await context.newPage();
        wishlistPage = new WishlistPage(page)
        productPage = new ProductDisplayPage(page)
        apiClient = new ApiClient()

    });
    test.afterEach(async () => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    test.describe.configure({mode: 'serial'});


    test("empty wishlist warning visible", async () => {
        //Arrange
        await page.goto(WishlistPage.url);

        //Act
        let warningText = await wishlistPage.getEmptyWishlistWarningText()

        //Assert
        expect(warningText).toContain(EMPTY_WISHLIST_WARNING_TEXT)

    });

    test("add item to wishlist from page", async ({request}) => {

        //Arrange
        await page.goto(productPage.getProductPageUrl())

        //Act
        await productPage.addItemToWishList()
        await wishlistPage.navigateToWishlistPage()

        //Assert
        expect(wishlistPage.getWishlistProductList()).toBeTruthy()
        await apiClient.removeFromWishList(request)

    })


});