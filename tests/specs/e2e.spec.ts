import { test } from "@playwright/test";
import LoginPom from "../pom/loginPom";
import HomePOM from "../pom/homePom";



test("Login", async ({page})=>{

    let loginPOM = new LoginPom(page);
    let homePOM = new HomePOM(page);

    await loginPOM.goto();
    await (await (await (await loginPOM.fillUserName("akhiljda@gmail.com")).fillPassword("Password")).clickSubmit()).clickProductLink();


    //transition
    //login -> home  //Page chaining
    //Home
   // await homePOM.clickProductLink();
  


})