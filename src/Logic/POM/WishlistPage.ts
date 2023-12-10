import {Locator, Page} from '@playwright/test'
import {BasePage} from "./BasePage";
import {ROOT_URL} from "../../../terminal-x-config";
import { promises } from 'dns';

export class WishlistPage extends BasePage{
    // private removeFromCartButtons: Locator
    public static url: string = `${ROOT_URL}/wishlist/items`
    private wishlistItemsCountTag: Locator
    private wishlistEmptyWarning: Locator
    private wishlistProductList: Locator

    constructor(page: Page) {
        super(page)

        this.wishlistItemsCountTag = this.wishlistNavigateButton.locator("span[class^='item-count']")
        this.wishlistEmptyWarning =page.locator("div[class^='warning'] span")
        this.wishlistProductList = page.locator("li[class^='wishlist-product']")
    }

    initPage = async () => {
        await this.page.waitForLoadState('domcontentloaded')
    }



    async reloadPage(){
        await this.page.reload()
        await this.page.waitForSelector("span[class^='item-count']",{state:'visible'})
    }

    async getEmptyWishlistWarningText() {
        return await this.wishlistEmptyWarning.textContent()
    }

    async getWishlistProductList(){
        return this.wishlistProductList
    }

    clickWishlistIcon = async () => {
        await this.wishlistNavigateButton.click()
    }

    async navigateToWishlistPage(){
        await this.clickWishlistIcon()
        await this.page.waitForURL(WishlistPage.url)
    }
}