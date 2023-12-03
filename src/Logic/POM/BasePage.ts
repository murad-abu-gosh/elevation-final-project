
import { Page } from 'playwright';

export class BasePage {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;

  }

  async waitForPageLoadNet() {
    await this.page.waitForLoadState("networkidle")
  }
  async waitForPageLoadDom() {
    await this.page.waitForLoadState("domcontentloaded")
  }



  // Add common methods here
}
