import {test, expect, Browser, Page, BrowserContext} from '@playwright/test';
import {Launcher} from "../src/Infra/Launcher";
import {SearchComponent} from "../src/Logic/POM/SearchComponent";
import {HttpRequest} from "../src/Infra/API_methods";
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
    let productPage : ProductDisplayPage
    let apiClient: ApiClient


    test.beforeAll(async () => {
        launcher = new Launcher()
        browser = await launcher.launchBrowser()
    });
    test.beforeEach(async () => {
        // page = await browser.newPage();
        context = await launcher.NewContext()
        page = await context.newPage();
        wishlistPage = new WishlistPage(page)
        productPage = new ProductDisplayPage(page)

    });
    test.afterEach(async () => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    test.describe.configure({ mode: 'serial' });


    test("empty wishlist warning visible", async () => {
        await page.goto(WishlistPage.url);
        let warningText = await wishlistPage.getEmptyWishlistWarningText()

        expect(warningText).toContain(EMPTY_WISHLIST_WARNING_TEXT)

    });

    test("add item to wishlist from page", async ({request}) => {
        await page.goto(productPage.getProductPageUrl())
        await productPage.addItemToWishList()
        await wishlistPage.navigateToWishlistPage()
        expect(wishlistPage.getWishlistProductList()).toBeTruthy()
        await apiClient.removeFromWishList(request)

    })


});