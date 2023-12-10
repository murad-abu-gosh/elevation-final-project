import {Page} from 'playwright';
import {Locator} from "@playwright/test";
import {WishlistPage} from "./WishlistPage";

export class BasePage {
    protected page: Page;
    protected wishlistNavigateButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.wishlistNavigateButton = this.wishlistNavigateButton = page.locator("a[data-test-id='qa-link-wishlist']")


    }

    async waitForPageLoadNet() {
        await this.page.waitForLoadState("networkidle")
    }

    async waitForPageLoadDom() {
        await this.page.waitForLoadState("domcontentloaded")
    }




    // Add common methods here
}
