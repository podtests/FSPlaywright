import { Locator, Page } from "@playwright/test";
import HomePOM from "./homePom";

export default class LoginPom { 
    
    private userNameTB: Locator;
     private passwordTB: Locator;
     private submitBtn: Locator;
     private page: Page;

    //
    constructor(page: Page){
        this.page = page;
        this.userNameTB = this.page.locator("input[name='email']");
        this.passwordTB = this.page.locator("input[name='password']");
        this.submitBtn= this.page.locator("button[type='submit']");
    }

    //methods
    public async goto() {
        await this.page.goto("account/login");
    }

    public async fillUserName(userName: string): Promise<LoginPom> {
        await this.userNameTB.fill(userName);
        return this;
    }

    public async fillPassword(password: string): Promise<LoginPom> {
        await this.passwordTB.fill(password);
        return this;
    }

    public async clickSubmit(): Promise<HomePOM>{
        await this.submitBtn.click();
        return new HomePOM(this.page);
    }

    public async submitCredentials(userName: string, password: string): Promise<HomePOM> {
        await this.fillUserName(userName);
        await this.fillPassword(password);
        return await this.clickSubmit();
    }

}