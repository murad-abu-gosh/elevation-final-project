import {test, expect, Browser, Page, BrowserContext} from '@playwright/test';
import {SearchComponent} from "../src/Logic/POM/SearchComponent";
import {Launcher} from '../src/Infra/Launcher';
import {HttpRequest} from '../src/Infra/API_methods';

test.describe('Search Component Tests', async () => {
    let browser: Browser;
    let page: Page;
    let context: BrowserContext;
    let launcher: Launcher;
    let searchComponent: SearchComponent


    test.beforeAll(async () => {
        launcher = new Launcher()
        browser = await launcher.launchBrowser()
    });
    test.beforeEach(async () => {
        page = await browser.newPage();
        context = await launcher.NewContext()
        searchComponent = new SearchComponent(page)
        await page.goto(SearchComponent.url);

    });
    test.afterEach(async () => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });


    const testData = ["nike", "adidas", "puma"]
    for (const data of testData) {
        test(`test search navigation for: ${data}`, async ({request}) => {
            //Act
            await searchComponent.fullSearchFlow(data)
            await searchComponent.waitForPageLoadNet()
            await searchComponent.waitForSearchPage(data)

            //Assert
            expect(page.url()).toEqual(searchComponent.getSearchPageUrl(data))

        });
    }

})