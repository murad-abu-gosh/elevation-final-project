import {test as setup} from '@playwright/test';
import {LOGIN_EMAIL, LOGIN_PASSWORD, ROOT_URL} from "../terminal-x-config";
import {ApiClient} from '../src/Infra/ApiClient';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({browser, request}) => {
    let LoginWithApi = new ApiClient();
    let respone = await LoginWithApi.loginApi(request, LOGIN_EMAIL, LOGIN_PASSWORD);
    const state = await request.storageState();
    const context = await browser.newContext({storageState: state});
    const page = await context.newPage();
    await page.goto(ROOT_URL, {waitUntil: 'domcontentloaded'});

    await page.context().storageState({path: authFile});
    await page.close()

});