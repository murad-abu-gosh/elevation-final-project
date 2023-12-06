import {Locator, Page} from '@playwright/test'
import {BasePage} from "./BasePage";
import {ROOT_URL} from "../../../terminal-x-config";
import { promises } from 'dns';

export class CartPage extends BasePage{
    // private removeFromCartButtons: Locator
    public static url: string = `${ROOT_URL}/checkout/cart`
    private itemsCountTag: Locator
    private shoppingCartNavigateButton: Locator

    constructor(page: Page) {
        super(page)
       
        this.itemsCountTag = page.locator("span[class^='item-count']")
        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState('domcontentloaded')
    }

    getCurrentItemsCount = async () => {
        let numberOfItems:number;
        if(await this.itemsCountTag.isHidden()){
         numberOfItems=0



        }else{
          numberOfItems = Number(await this.itemsCountTag.textContent())

        }

    return  numberOfItems
 
      
    }

    clickShoppingCartNavigateButton = async () => {
        await this.shoppingCartNavigateButton.click()
    }

    clickFirstItemRemoveButton = async () => {
        const removeFromCartButtons = this.page.locator("div[class^='cart-items-list']").locator("button[class*='remove_wq']")
        await removeFromCartButtons.first().click()
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

    async reloadPage(){
                await this.page.reload()
                await this.page.waitForSelector("span[class^='item-count']",{state:'visible'})
    }

    getCartPageUrl() {
        return CartPage.url
    }
}