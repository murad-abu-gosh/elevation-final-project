import {Locator, Page} from '@playwright/test'

export class MiniCartComponent {
    private page: Page;
    private email: Locator
    private password: Locator
    private removeFromCartButtons: Locator
    private miniCartWindow: Locator
    public static url: string = 'https://www.terminalx.com'
    private confirmRemoveButton: Locator;
    private itemsCountTag: Locator
    private shoppingCartNavigateButton: Locator

    constructor(page: Page) {
        this.page = page

        this.removeFromCartButtons = page.locator("div[class^='minicart-items']").locator("button[class*='remove_wq']")
        this.miniCartWindow = page.locator("a[data-test-id='qa-link-minicart']")
        this.confirmRemoveButton = page.getByText("אישור")
        this.itemsCountTag = page.locator("span[class^='item-count']")
        this.shoppingCartNavigateButton = page.locator("a[data-test-id='qa-minicart-cart-button']")
        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState()
    }

    getCurrentItemsCount = async () => {
        return await this.itemsCountTag.textContent()
    }

    clickMiniCartWindow = async () => {
        await this.miniCartWindow.click()
    }

    clickShoppingCartNavigateButton = async () => {
        await this.shoppingCartNavigateButton.click()
    }

    clickConfirmRemoveButton = async () => {
        await this.confirmRemoveButton.click()
    }

    clickFirstItemRemoveButton = async () => {
        await this.removeFromCartButtons.first().click()
    }


    fullRemoveFirstItemFlow = async () => {
        await this.clickMiniCartWindow()
        await this.clickFirstItemRemoveButton()
        await this.clickConfirmRemoveButton()
    }
}