import {Locator, Page} from '@playwright/test'
import {BaseComponent} from "./BaseComponent";
import {ROOT_URL} from "../../../terminal-x-config";

export class MiniCartComponent extends BaseComponent{
    private email: Locator
    private password: Locator
    private removeFromCartButtons: Locator
    private miniCartWindow: Locator
    public static url: string = `${ROOT_URL}`
    private confirmRemoveButton: Locator;
    private itemsCountTag: Locator
    private shoppingCartNavigateButton: Locator
    private miniCartLocator: string

    constructor(page: Page) {
        super(page)

        this.removeFromCartButtons = page.locator("div[class^='minicart-items']").locator("button[class*='remove_wq']")
        this.miniCartWindow = page.locator("a[data-test-id='qa-link-minicart']")
        this.confirmRemoveButton = page.getByText("אישור")
        this.itemsCountTag = page.locator("a[data-test-id='qa-link-minicart']").locator("span[class^='item-count']")
        this.shoppingCartNavigateButton = page.locator("a[data-test-id='qa-minicart-cart-button']")
        this.miniCartLocator = "div[class^='minicart-wrapper']"
        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState('domcontentloaded')
    }

    getCurrentItemsCount = async () => {
        let numberOfItems: number;
        if (await this.itemsCountTag.isHidden()) {
            numberOfItems = 0


        } else {
            numberOfItems = Number(await this.itemsCountTag.textContent())

        }

        return numberOfItems


    }

    clickMiniCartWindow = async () => {
        await this.miniCartWindow.click()
    }

    clickShoppingCartNavigateButton = async () => {
        await this.page.waitForSelector("a[data-test-id='qa-link-minicart']",{state:'visible'})
        await this.shoppingCartNavigateButton.click()
    }

    async waitForMiniCartHidden(){
        await this.page.waitForSelector(this.miniCartLocator,{state:'hidden'})
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
        await this.waitForMiniCartHidden()
    }

    async navigateToPage(){
        await this.page.goto(MiniCartComponent.url, { waitUntil: 'domcontentloaded' })
    }
}