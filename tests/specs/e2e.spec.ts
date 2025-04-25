import { expect, test } from "@playwright/test";
import LoginPom from "../pom/loginPom";
import HomePOM from "../pom/homePom";
import ProductPOM from "../pom/productPom";
import CartPOM from "../pom/cartPom";
import CheckoutPOM from "../pom/checkoutPom";
import { readJSonDataForTestCase } from "../utils/fileUtil";
import * as path from 'path';
import { LoginDataLayer } from "../dataControllerLayer/loginDataLayer";
import LoginInputDao from "../dao/inputDao/loginInputDao";
import { ProductDataLayer } from "../dataControllerLayer/productDataLayer";
import ProductInputDao from "../dao/inputDao/productInputDao";
import { CheckoutDataLayer } from "../dataControllerLayer/checkoutDataLayer";
import CheckoutInputDao from "../dao/inputDao/checkoutInputDao";
import SuccessPOM from "../pom/successPom";
import SuccessOutputDao from "../dao/outputDao/successOutputDao";
import { validateSuccessPage } from "../verificationLayer/successPageAssertions";
test("Tc1", async ({page})=>{
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    let loginPOM = new LoginPom(page);
    //let homePOM = new HomePOM(page);

    await loginPOM.goto();
    //await (await (await (await loginPOM.fillUserName("akhiljda@gmail.com")).fillPassword("Password")).clickSubmit()).clickProductLink();

    const filePath =  path.join(process.cwd(), "/tests/testData/e2e.json");
    console.log("filepath is:",filePath);
    const testData = readJSonDataForTestCase(filePath, "TC1"); 
    console.log("testdata ", testData)   ;

    const loginData: LoginDataLayer =  testData["login"];
    const loginInputDao: LoginInputDao = new LoginInputDao(loginData);   
    
    const productData : ProductDataLayer = testData["product"];
    const productInputDao: ProductInputDao = new ProductInputDao(productData);


    const checkoutData : CheckoutDataLayer = testData["checkout"];
    const checkoutInputDao: CheckoutInputDao = new CheckoutInputDao(checkoutData);



    //Json -> JS Object -> goes through complaince check using DataControler Layer -> Dao Layer -> POM

    let homePOM: HomePOM = await loginPOM.submitCredentials(loginInputDao);
    let productPOM : ProductPOM =   await homePOM.clickProductLink();
    let cartPOM: CartPOM = await productPOM.fillProductDetails(productInputDao);
    let products: string[][] = await cartPOM.getProducts();
    products.forEach((product)=>{
        console.log("Product data is: ", product);
    })
    let checkoutPOM : CheckoutPOM =  await cartPOM.clickCheckoutButton();
    //await (await (await (await (await checkoutPOM.fillAddressDetails("Akhil Jain", "20089765", "Delhi", "Gzb", "110099", "United States", "Alabama")).selectShippingMethod("standard")).clickContinueToPayment()).selectDeliveryMethod("cash")).clickPlaceOrderButton();
    let successPOm: SuccessPOM =   await checkoutPOM.completeCheckoutProceding(checkoutInputDao);
    let successOutputDao: SuccessOutputDao = await successPOm.getSuccessOutput();

    
    //await page.pause();
    let expectedData = loginInputDao.getUserName();
    validateSuccessPage(loginInputDao, successOutputDao);
    //expect(expectedData).toEqual(actualEmailId);

})
