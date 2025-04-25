import { Locator, Page } from "@playwright/test";
import SuccessOutputDao from "../dao/outputDao/successOutputDao";

export default class SuccessPOM {

    private emailID: Locator;
    private page: Page;

    constructor(page: Page){
        this.page = page;
        this.emailID = this.page.locator("//div[contains(@class,'customer-info')]/div[contains(@class,'grid-cols-2')]/div[1]//div[@class='text-textSubdued'][2]");        
    }

    public async getSuccessOutput(): Promise<SuccessOutputDao> {
        return new SuccessOutputDao(await this.emailID.innerText());
    }
}