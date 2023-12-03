import {Browser, BrowserContext, BrowserType, Page, chromium} from "@playwright/test";

export class Launcher {
    private browser: Browser
    private context: BrowserContext;

    public async launch() {
        await this.launchBrowser()
        await this.NewContext()
        return await this.NewPage()


    }

    public async NewPage(): Promise<Page> {
        const newPage = await this.context.newPage();
        return newPage;
    }

    public async NewContext(): Promise<BrowserContext> {
        this.context = await this.browser.newContext()
        return this.context
    }

    public async launchBrowser(): Promise<Browser> {
        this.browser = await chromium.launch()
        return this.browser
    }


}