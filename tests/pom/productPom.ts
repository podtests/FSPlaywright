import { expect, Locator, Page } from "@playwright/test";
import CartPOM from "./cartPom";

export default class ProductPOM {

    private sizeType: string;
    private colorType: string;
    private addToCartBtn: Locator;
    private qtyTB: Locator;
    private page: Page;
    private viewCartBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.sizeType =  "(//ul[contains(@class,'variant-option-list')])[1]/li/a[text()='$$']";
        this.colorType = "(//ul[contains(@class,'variant-option-list')])[2]/li/a[text()='$$']";
        this.qtyTB = this.page.locator("input[name='qty']");
        this.addToCartBtn = this.page.locator("//button[@type='button']/span[text()='ADD TO CART']");
        this.viewCartBtn = this.page.locator("a.add-cart-popup-button");
    }

    public async fillProductDetails(size: string, color: string, qty: string ): Promise<CartPOM> {
        await this.selectSize(size);
        await this.selectColor(color);
        await this.fillQuantity(qty);
        await this.clickAddToCartButton();
        return await this.clickViewCartButton();
    }

    private createSizeLocator(size: string): Locator {
        let sizeTypeLocator : Locator = this.page.locator( this.sizeType.replace("$$", size));
        return sizeTypeLocator;       
      }

    public async selectSize(size: string): Promise<ProductPOM>{         
        let sizeLocator =  this.createSizeLocator(size);
        await sizeLocator.click();       
        await expect(sizeLocator.locator("//parent::li")).toHaveClass("selected");                    
        return this;  
    }

    private createColorLocator(color: string): Locator {
        let colorTypeLocator : Locator = this.page.locator( this.colorType.replace("$$", color));
        return colorTypeLocator;       
      }

    public async selectColor(color: string): Promise<ProductPOM>{   
        let colorLocator =  this.createColorLocator(color);
        await colorLocator.click();       
        await expect(colorLocator.locator("//parent::li")).toHaveClass("selected");                
        return this;   
    }

    public async fillQuantity(qty: string): Promise<ProductPOM>{         
        await this.qtyTB.fill(qty);
        return this;   
    }

    public async clickAddToCartButton(): Promise<ProductPOM>{         
        await this.addToCartBtn.click();
        return this;   
    }

    public async clickViewCartButton(): Promise<CartPOM> {
        await this.viewCartBtn.click();
        return new CartPOM(this.page);
    }

    
}