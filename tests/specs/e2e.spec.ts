import { test } from "@playwright/test";
import LoginPom from "../pom/loginPom";
import HomePOM from "../pom/homePom";
import ProductPOM from "../pom/productPom";
import CartPOM from "../pom/cartPom";
import CheckoutPOM from "../pom/checkoutPom";

test("Login", async ({page})=>{

    let loginPOM = new LoginPom(page);
    //let homePOM = new HomePOM(page);

    await loginPOM.goto();
    //await (await (await (await loginPOM.fillUserName("akhiljda@gmail.com")).fillPassword("Password")).clickSubmit()).clickProductLink();

    let homePOM: HomePOM = await loginPOM.submitCredentials("akhiljda@gmail.com", "Password");
    let productPOM : ProductPOM =   await homePOM.clickProductLink();
    let cartPOM: CartPOM = await productPOM.fillProductDetails("M", "Green", "3");
    let products: string[][] = await cartPOM.getProducts();
    products.forEach((product)=>{
        console.log("Product data is: ", product);
    })
    let checkoutPOM : CheckoutPOM =  await cartPOM.clickCheckoutButton();
    await (await (await (await (await checkoutPOM.fillAddressDetails("Akhil Jain", "20089765", "Delhi", "Gzb", "110099", "United States", "Alabama")).selectShippingMethod("standard")).clickContinueToPayment()).selectDeliveryMethod("cash")).clickPlaceOrderButton();

    await page.pause();


})
