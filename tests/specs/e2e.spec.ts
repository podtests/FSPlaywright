import { test } from "@playwright/test";
import LoginPom from "../pom/loginPom";
import HomePOM from "../pom/homePom";
import ProductPOM from "../pom/productPom";
import CartPOM from "../pom/cartPom";



test("Login", async ({page})=>{

    let loginPOM = new LoginPom(page);
    //let homePOM = new HomePOM(page);

    await loginPOM.goto();
    //await (await (await (await loginPOM.fillUserName("akhiljda@gmail.com")).fillPassword("Password")).clickSubmit()).clickProductLink();

    let homePOM: HomePOM = await loginPOM.submitCredentials("akhiljda@gmail.com", "Password");
    let productPOM : ProductPOM =   await homePOM.clickProductLink();
    await productPOM.fillProductDetails("M", "Green", "3");
    //let cartPom: CartPOM = 



    //transition
    //login -> home  //Page chaining
    //Home
   // await homePOM.clickProductLink();
  


})