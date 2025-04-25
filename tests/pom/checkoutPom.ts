import { Locator, Page } from "@playwright/test";
import SuccessPOM from "./successPom";
import CheckoutInputDao from "../dao/inputDao/checkoutInputDao";

export default class CheckoutPOM{
    private page: Page;
    private fullNameTB: Locator;
    private telehoneTB: Locator;
    private addressTB: Locator;
    private cityTB: Locator;
    private countryDD: Locator;
    private postCodeTB: Locator;
    private continueToPaymentBtn: Locator;
    private provinceDD: Locator;
    private shippingMethodType: string;
    private placeOrderBtn: Locator;
    private deliveryMethod: string;

    constructor(page: Page){
        this.page = page;
        this.fullNameTB = this.page.locator("//input[@name='address[full_name]']");
        this.telehoneTB= this.page.locator("//input[@name='address[telephone]']");
        this.addressTB = this.page.locator("//input[@name='address[address_1]']");
        this.cityTB = this.page.locator("//input[@name='address[city]']");
        this.countryDD = this.page.locator("//select[@id='address[country]']");
        this.postCodeTB = this.page.locator("//input[@name='address[postcode]']");
        this.continueToPaymentBtn = this.page.locator("//button/span[text()='Continue to payment']");
        this.provinceDD = this.page.locator("//select[@id='address[province]']");
        this.shippingMethodType = "//div[@class='shipping-methods']//input//following-sibling::span[contains(text(),'$$')]";
        this.placeOrderBtn = this.page.locator("//button/span[text()='Place Order']");
        this.deliveryMethod = "//img[@alt='$$']//ancestor::div[contains(@class,'payment-method-list')]//a"
//
        //(//div[contains(@class,'payment-method-list')]//a)[1]
    }

    public async completeCheckoutProceding(checkoutInputDao: CheckoutInputDao): Promise<SuccessPOM> {
        await this.fillAddressDetails(checkoutInputDao.getFullName(), checkoutInputDao.getTelephone(),
            checkoutInputDao.getAddress(), checkoutInputDao.getCity(), checkoutInputDao.getPostcode(),
        checkoutInputDao.getCountry(), checkoutInputDao.getProvince() );
        await this.selectShippingMethod(checkoutInputDao.getDeliveryMethod());
        await this.clickContinueToPayment();
        await this.selectDeliveryMethod(checkoutInputDao.getPaymentMethod());
        return await this.clickPlaceOrderButton();
    }

    public async selectDeliveryMethod(deliveryMethod: string): Promise<CheckoutPOM>{        
        let finalDeliveryMethod : string;
        if(deliveryMethod.toLowerCase().includes("cash")){
            finalDeliveryMethod = this.deliveryMethod.replace("$$", "Cash On Delivery");
        }else if(deliveryMethod.toLowerCase().includes("paypal")){
            finalDeliveryMethod = this.deliveryMethod.replace("$$", "Paypal");
        }else{
            finalDeliveryMethod = this.deliveryMethod.replace("$$", "Stripe");
            
        }
        await this.page.locator(finalDeliveryMethod).waitFor({state: 'visible'});
        await this.page.locator(finalDeliveryMethod).click();
        return this;
    }

    public async clickPlaceOrderButton(): Promise<SuccessPOM> {
        await this.placeOrderBtn.click();
        return new SuccessPOM(this.page);
    }
    public async fillAddressDetails(fullName: string, telephone: string, address: string, city: string, postcode: string, countryName: string, provinceName: string): Promise<CheckoutPOM> {
        await this.fullNameTB.fill(fullName);
        await this.telehoneTB.fill(telephone);
        await this.addressTB.fill(address);
        await this.cityTB.fill(city);
        await this.countryDD.selectOption({label: countryName});
        await this.postCodeTB.fill(postcode);
        await this.provinceDD.waitFor({state: 'visible'});
        await this.provinceDD.selectOption({label: provinceName});
        return this;
    }

    public async selectShippingMethod(shippingMethodType: string): Promise<CheckoutPOM> {
        let finalshippingMethodType : string;
        if(shippingMethodType.toLowerCase().includes("standard")){
            finalshippingMethodType = this.shippingMethodType.replace("$$", "Standard");
        }else {
            finalshippingMethodType = this.shippingMethodType.replace("$$", "Express");
        }
        await this.page.locator(finalshippingMethodType).waitFor({state: 'visible'});
        await this.page.locator(finalshippingMethodType).click();
        return this;
    }

    public async clickContinueToPayment(): Promise<CheckoutPOM> {
       await this.continueToPaymentBtn.click();
       return this;
    }
}