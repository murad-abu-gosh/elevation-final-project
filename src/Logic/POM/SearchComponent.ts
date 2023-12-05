import {Locator, Page} from '@playwright/test'
import {BaseComponent} from "./BaseComponent";
import {ROOT_URL} from "../../../terminal-x-config";

export class SearchComponent extends BaseComponent{
    private removeFromCartButtons: Locator
    public static url: string = `${ROOT_URL}`
    private itemsCountTag: Locator
    private shoppingCartNavigateButton: Locator
    private searchButton: Locator;
    private searchBarInput: Locator;

    constructor(page: Page) {
        super(page)
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
        await this.page.waitForSelector("input[data-test='search-input']",{state:'visible'})
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

    async waitForSearchPage(searchTerm: string){
        await this.page.waitForURL(`${ROOT_URL}/catalogsearch/result/?q=${searchTerm}`)
    }

    getSearchPageUrl(searchTerm: string){
        return `${ROOT_URL}/catalogsearch/result/?q=${searchTerm}`
    }
}