import {test, expect, Browser, Page, BrowserContext} from '@playwright/test';
import {describe} from "node:test";
import {chromium} from "playwright";
import {LoginComponent} from "../src/Logic/POM/LoginComponent";
import {SearchComponent} from "../src/Logic/POM/SearchComponent";
import { Launcher } from '../src/Infra/Launcher';
import { HttpRequest, Method } from '../src/Infra/API_methods';
import { ListingSearchQuery, ListingSearchRoot } from '../src/Logic/HttpRequestBody/SearchingList';

describe('Search Component Tests', async () => {
    let browser: Browser;
    let page: Page;
    let context:BrowserContext;
    let launcher:Launcher;
    let searchComponent: SearchComponent
    let HttpMethod:HttpRequest ;


    test.beforeAll(async () => {
        // browser = await chromium.launch({headless: false});
        // browser = await chromium.launch();
        launcher = new Launcher()
        browser=await launcher.launchBrowser()
    });
    test.beforeEach(async () => {
        // page = await browser.newPage();
        context = await launcher.NewContext()
        page = await launcher.NewPage()
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
            test.setTimeout(60000)
            HttpMethod=new HttpRequest()
            let headers = {"Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/plain, */*"}
            let body:ListingSearchRoot=JSON.parse(`{"listingSearchQuery": {"categoryId": "2","filter": {"category_id": {"eq": "2"}},"pageSize": 24,"currentPage": 1,"search": "${data}","sort": {"default": true},"includeAggregations": true,"includeCategory": true}}`)
            const response=await HttpMethod.httpRequest(request,Method.POST,"https://www.terminalx.com/a/listingSearch",headers,body)
            console.log(`${ data }\n`)  
            console.log( HttpMethod.GetBody())

            await searchComponent.fullSearchFlow(data)
            // await page.waitForTimeout(2000)
            await searchComponent.waitForPageLoadNet()
            await searchComponent.waitForSearchPage(data)
            expect(page.url()).toEqual(searchComponent.getSearchPageUrl(data))

        });
    }

})