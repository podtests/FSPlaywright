import { Locator, Page } from "@playwright/test";
import CheckoutPOM from "./checkoutPom";

export default class CartPOM{

    private columns : Locator;
    private rows : Locator;
    private page: Page;
    private productName: string;
    private productPrice: string;
    private productQty: string;
    private totalPrice: string;
    private checkoutBtn: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.columns = page.locator("table thead tr td");
       this.rows = page.locator("table tbody tr");
       this.productName = "//td[1]//div[@class='cart-tem-info']/a";
        this.productPrice = "//td[2]//div/span[@class='sale-price']";
        this.productQty = "//td[3]//input";
        this.totalPrice = "//td[4]//span"; 
        this.checkoutBtn = this.page.locator("//a/span[text()='CHECKOUT']");       
    }

    public async clickCheckoutButton(): Promise<CheckoutPOM> {
        await this.checkoutBtn.click();
        return new CheckoutPOM(this.page);
    }

    public async columnCount(): Promise<number> {
       return await this.columns.count();
    }

    public async getColumnNames(): Promise<string[]> {
        let columns = await this.columns.all();
        let columnNames : string[] = [];
            
        for(const column of columns){
            let columnName = await column.locator("span").innerText();
            columnNames.push(columnName);          
        }
    
       return columnNames;
    }

    public async getRowCount(): Promise<number> {
        return this.rows.count();
    }

    public async getProducts(): Promise<string[][]> {
        let rows = await this.rows.all();

        let rowsContent : string[][] = [];
    
        for(const row of rows){
    
            let rowContent: string[] =[];
    
            rowContent.push(await row.locator(this.productName).innerText());
            rowContent.push(await row.locator(this.productPrice).innerText());
            rowContent.push(await row.locator(this.productQty).getAttribute("value")??"no data");
            rowContent.push(await row.locator(this.totalPrice).innerText());   
            
            rowsContent.push(rowContent);
        }
        return rowsContent;
    }


}