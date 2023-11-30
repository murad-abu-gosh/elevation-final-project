import {Locator, Page} from '@playwright/test'

export class LoginComponent {
    private page: Page;
    private email: Locator
    private password: Locator
    private loginButton: Locator
    private loginWindow: Locator
    private profileName: Locator
    public static url: string = 'https://www.terminalx.com'

    constructor(page: Page) {
        this.page = page
        this.email = page.locator("input[class='input_3Q5c rtl_2vgE ltr_2G38 input-left_p5DQ']")
        this.password = page.locator("input[name='password']")
        this.loginButton = page.locator("button[data-test-id='qa-login-submit']")
        this.loginWindow = page.locator("a[data-test-id='qa-header-login-button']")
        this.profileName = page.locator("span[class*='profile-button-new-menu-underline']")
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
        return this.profileName.textContent()
    }
    fullLoginFlow = async (email: string, password: string) => {
        await this.clickLoginWindow()
        await this.fillUserNameInput(email)
        await this.fillPasswordInput(password)
        await this.clickSubmitButton()
    }
}