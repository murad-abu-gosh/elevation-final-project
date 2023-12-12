import {Locator, Page} from '@playwright/test'
import {BasePage} from "./BasePage";
import {ROOT_URL} from "../../../terminal-x-config";

export class ProductDisplayPage extends BasePage {
    public static url: string = `${ROOT_URL}/men/knitwear-sweatshirts/knitwear/w114640001?color=4`
    private addToWishlistButton: Locator

    constructor(page: Page) {
        super(page)

        this.addToWishlistButton = page.locator("button[class^='toggle_3KGH']")
        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState('domcontentloaded')
    }

    getProductPageUrl() {
        return ProductDisplayPage.url
    }

    async addItemToWishList() {
        await this.addToWishlistButton.click()
    }

}