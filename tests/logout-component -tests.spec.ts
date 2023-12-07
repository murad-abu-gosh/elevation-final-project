import test, { Browser, BrowserContext, Page, expect } from "@playwright/test";
import { Launcher } from "../src/Infra/Launcher";
import { ApiClient } from "../src/Infra/ApiClient";
import { LoginComponent } from "../src/Logic/POM/LoginComponent";


test.describe("implement the log out tests stream ", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let launcher: Launcher;
    let LogOutWithApi: ApiClient;
    let loginPage: LoginComponent;

    test.beforeAll(async () => {

        launcher = new Launcher()
        browser = await launcher.launchBrowser()
    });
    test.beforeEach(async () => {
        page = await browser.newPage();
        context = await launcher.NewContext()
        // page = await launcher.NewPage()
        LogOutWithApi = new ApiClient();
        loginPage = new LoginComponent(page)
        await page.goto(LoginComponent.url);

    });
    test.afterEach(async () => {

        // const name = await loginPage.getProfileNameNoWait();
        // if (name != PROFILE_NAME) {
        //     await loginPage.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
        // }
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    test("check logout feature", async ({ request }) => {

        LogOutWithApi.logOutApi(request)
        await page.reload()

        const status = await loginPage.getProfileNameNoWait()

        expect(status).toEqual(null)




    })




})