import { test, expect } from '@playwright/test';
// import {logs} from '../src/Request Body/logs'
import { Root2 } from './logs';
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test("jk",async ({request})=>{
  const temp :Root2 = JSON.parse('[{"src":"client","location":"https://www.terminalx.com/","path":"/","originalReqId":"0c882f61-ded7-4d6a-97f1-4c7761f0ac0d","component":"PanelStore","level":40,"msg":"addPanel - panel id footer-news-modal already exists","time":"2023-11-29T17:33:20.181Z","useragent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"}]')
 
  const issue= await request.post("https://www.terminalx.com/logs",{
    headers:{"Content-Type":"application/json; charset=utf-8",
    "Accept":"application/json, text/plain, */*"
  },data:temp

})
if( issue.ok()){
  console.log(await issue.json())
}




})
