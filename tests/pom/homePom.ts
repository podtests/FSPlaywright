import { Locator, Page } from "@playwright/test";
import ProductPOM from "./productPom";

export default class HomePOM {

    private productLink: Locator;
    private page: Page;

    constructor(page: Page){
        this.page = page;
        this.productLink = this.page.locator("//div[contains(@class,'product-name')]/a[contains(@href,'nike-react-infinity-run')]");
    }
    
    public async clickProductLink(): Promise<ProductPOM> {
        await this.productLink.click();
        return new ProductPOM(this.page);
    }
}