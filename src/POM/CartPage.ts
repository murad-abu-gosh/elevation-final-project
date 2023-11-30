import {Locator, Page} from '@playwright/test'

export class CartPage {
    private page: Page;
    private removeFromCartButtons: Locator
    public static url: string = 'https://www.terminalx.com/checkout/cart'
    private itemsCountTag: Locator
    private shoppingCartNavigateButton: Locator

    constructor(page: Page) {
        this.page = page

        this.removeFromCartButtons = page.locator("div[class^='cart-items-list']").locator("button[class*='remove_wq']")
        this.itemsCountTag = page.locator("span[class^='item-count']")
        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState()
    }

    getCurrentItemsCount = async () => {
        return await this.itemsCountTag.textContent()
    }

    clickShoppingCartNavigateButton = async () => {
        await this.shoppingCartNavigateButton.click()
    }

    clickFirstItemRemoveButton = async () => {
        await this.removeFromCartButtons.first().click()
    }

    fullRemoveFirstItemFlow = async () => {
        await this.clickFirstItemRemoveButton()
    }
}