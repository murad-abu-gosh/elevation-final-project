import {Locator, Page} from '@playwright/test'

export class LoginPage {
    private page: Page;
    private username: Locator
    private password: Locator
    private loginButton: Locator
    public static url: string = 'https://www.pokellector.com/signin'

    constructor(page: Page) {
        this.page = page
        this.username = page.locator("input[name='username']")
        this.password = page.locator("input[name='password']")
        this.loginButton = page.locator("button[type='submit']")
        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState()
    }

    fillUserNameInput = async (userName: string) => {
        await this.username.fill(userName)
    }

    fillPasswordInput = async (password: string) => {

        await this.password.fill(password)

    }

    clickSubmitButton = async () => {
        await this.loginButton.click()
    }

    fullLoginFlow = async (userName: string, password: string) => {
        await this.fillUserNameInput(userName)
        await this.fillPasswordInput(password)
        await this.clickSubmitButton()
    }
}