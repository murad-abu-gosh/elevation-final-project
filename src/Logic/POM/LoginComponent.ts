import {Locator, Page} from '@playwright/test'
import {BasePage} from "./BasePage";
import {ROOT_URL} from "../../../terminal-x-config";

export class LoginComponent extends BasePage {
    private email: Locator
    private password: Locator
    private loginButton: Locator
    private loginWindow: Locator
    private profileName: Locator
    private errorAlertBox: Locator

    public static url: string = `${ROOT_URL}`

    constructor(page: Page) {
        super(page)
        this.email = page.locator("input[class='input_3Q5c rtl_2vgE ltr_2G38 input-left_p5DQ']")
        this.password = page.locator("input[name='password']")
        this.loginButton = page.locator("button[data-test-id='qa-login-submit']")
        this.loginWindow = page.locator("a[data-test-id='qa-header-login-button']")
        this.profileName = page.locator("span[class*='profile-button-new-menu-underline']")
        this.errorAlertBox = page.locator("div[data-test-id='qa-login-error-toast']")

        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState()
    }

    clickLoginWindow = async () => {
        await this.loginWindow.click()
    }

    fillUserNameInput = async (email: string) => {
        await this.email.fill(email)
    }

    fillPasswordInput = async (password: string) => {

        await this.password.fill(password)

    }

    clickSubmitButton = async () => {
        await this.loginButton.click()
    }

    getProfileName = async () => {
        await this.page.waitForSelector("span[class*='profile-button-new-menu-underline']", {state: "visible"})
        return this.profileName.textContent()
    }
    fullLoginFlow = async (email: string, password: string) => {
        await this.clickLoginWindow()
        await this.fillUserNameInput(email)
        await this.fillPasswordInput(password)
        await this.clickSubmitButton()
    }

    async getAlertBox() {
        return this.errorAlertBox;
    }
}