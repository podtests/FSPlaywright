import { Locator, Page } from "@playwright/test";

export default class HomePOM {

    private productLink: Locator;
    private page: Page;

    constructor(page: Page){
        this.page = page;
        this.productLink = this.page.locator("//div[contains(@class,'product-name')]/a[contains(@href,'nike-react-infinity-run')]");
    }
    
    public async clickProductLink() {
        await this.productLink.click();
    }
}