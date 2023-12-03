
import { Page } from 'playwright';
import {BasePage} from "./BasePage";

export class BaseComponent extends BasePage{
    constructor(page: Page) {
        super(page)
    }

    // Add common methods here
}
