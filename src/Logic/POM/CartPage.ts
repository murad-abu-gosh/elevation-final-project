import {Locator, Page} from '@playwright/test'
import {BasePage} from "./BasePage";
import {ROOT_URL} from "../../../terminal-x-config";
import { promises } from 'dns';

export class CartPage extends BasePage{
    private removeFromCartButtons: Locator
    public static url: string = `${ROOT_URL}/checkout/cart`
    private itemsCountTag: Locator
    private shoppingCartNavigateButton: Locator

    constructor(page: Page) {
        super(page)
        this.removeFromCartButtons = page.locator("div[class^='cart-items-list']").locator("button[class*='remove_wq']")
        this.itemsCountTag = page.locator("span[class^='item-count']")
        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState()
    }

    getCurrentItemsCount = async () => {
     
         
    return  Number(await this.itemsCountTag.textContent())
 
      
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

    async navigateToPage(){
        await this.page.goto(CartPage.url, { waitUntil: 'domcontentloaded' })
    }

    async waitForCartPage() {
        await this.page.waitForURL(CartPage.url)


    }

    getCartPageUrl() {
        return CartPage.url
    }
}