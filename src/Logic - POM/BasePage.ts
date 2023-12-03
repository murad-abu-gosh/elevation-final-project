
import { Page } from 'playwright';

export class BasePage {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;

  }

  async waitForPageLoad(){
    await this.page.waitForLoadState("networkidle")
  }

  // Add common methods here
}
