import test, { Browser, BrowserContext, Page, expect } from "@playwright/test";
import { Launcher } from "../src/Infra/Launcher";
import { ApiClient } from "../src/Infra/ApiClient";
import { LoginComponent } from "../src/Logic/POM/LoginComponent";
import { LOGIN_EMAIL, LOGIN_EMAIL2, LOGIN_PASSWORD, LOGIN_PASSWORD2 } from "../terminal-x-config";

const authFile = 'playwright/.auth/user2.json';
test.describe("implement the log out tests stream ", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let launcher: Launcher;
    let LogOutWithApi: ApiClient;
    let loginPage: LoginComponent;
    let LoginWithApi : ApiClient;
    test.use({storageState: {cookies: [], origins: []}});
    test.beforeAll(async () => {

     launcher = new Launcher()
     browser = await launcher.launchBrowser()
    });
    test.beforeEach(async ({request }) => {
        LogOutWithApi = new ApiClient();
        LoginWithApi = new ApiClient();
        const res = await LoginWithApi.loginApi(request,LOGIN_EMAIL2 ,LOGIN_PASSWORD2 );
        const state = await request.storageState();
        context = await browser.newContext({ storageState: state });
        page = await context.newPage();
        await page.goto(LoginComponent.url);
        loginPage = new LoginComponent(page)
    



    });
    test.afterEach(async () => {

        
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    test("test logout feature", async ({ request }) => {
      
        await LogOutWithApi.logOutApi(request)
        await page.reload()
        const status = await loginPage.getProfileNameNoWait()
        expect(status).toEqual(null)




    })




})