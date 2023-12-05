// auth.setup.ts
import { expect, test as setup } from '@playwright/test';
import {LoginComponent} from '../src/Logic/POM/LoginComponent';
import {LOGIN_EMAIL, LOGIN_PASSWORD, ROOT_URL} from "../terminal-x-config";
import { ApiClient } from '../src/Infra/ApiClient';
const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({  browser, request  }) => {
    // Perform authentication steps. Replace these actions with your own.
    // await page.goto(LoginComponent.url);
    
    // await loginComp.fullLoginFlow(LOGIN_EMAIL, LOGIN_PASSWORD)
    // // Wait until the page receives the cookies.
    // await page.waitForLoadState("networkidle")
   
    // await page.goto(LoginComponent.url, { waitUntil: 'domcontentloaded' });
    let LoginWithApi = new ApiClient();
    let respone = await LoginWithApi.loginApi(request,LOGIN_EMAIL ,LOGIN_PASSWORD );
    const state = await request.storageState();
    const context = await browser.newContext({ storageState: state });
    const page = await context.newPage();
    await page.goto(ROOT_URL);

    await page.context().storageState({ path: authFile });
    await page.close()

});