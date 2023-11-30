import {Locator, Page} from '@playwright/test'

export class SearchComponent {
    private page: Page;
    private removeFromCartButtons: Locator
    public static url: string = 'https://www.terminalx.com'
    private itemsCountTag: Locator
    private shoppingCartNavigateButton: Locator
    private searchButton: Locator;
    private searchBarInput: Locator;

    constructor(page: Page) {
        this.page = page
        this.searchButton = page.locator("button[data-test-id='qa-header-search-button']")
        this.searchBarInput = page.locator("input[data-test='search-input']")
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

    async clickSearchButton() {
        await this.searchButton.click()
    }

    async fillSearchBar(searchInput: string) {
        await this.searchBarInput.fill(searchInput)
    }

    private async pressEnter() {
        await this.page.keyboard.press("Enter")
    }

    fullSearchFlow = async (searchInput: string) => {
        await this.clickSearchButton()
        await this.fillSearchBar(searchInput)
        await this.pressEnter()
    }
}