import {BrowserContext, Cookie, Page, test, Browser} from '@playwright/test';

/*
test.use({navigationTimeout: 30000,
    actionTimeout: 20000
});
*/

test.skip("tc1", async ({ browser  })=>{


    browser.on('disconnected',()=>{
        console.log("Browser got disconnected!");
    })


    console.log(browser.isConnected());  //true

    let p1 = await browser.newPage();    
    await p1.goto("https://podtest.in");

    let contexts = browser.contexts();
    console.log(browser.version());

    console.log(browser.isConnected());  //true

    await browser.close();

    console.log(browser.isConnected());  //false


   
    //let c1 = await browser.newContext();
    //let p2 = await c1.newPage();

    //await p2.goto("https://youtube.com");

    
/*
    let browserType = browser.browserType();
    console.log('browserType is: ', browserType);

    let c1: BrowserContext = await browser.newContext();

    let c2: BrowserContext = await browser.newContext();

    let p1 = await c1.newPage();

    let p2 = await c2.newPage();



    await p1.goto("https://podtest.in");

    await p2.goto("https://youtube.com/@podtest");

    //await p2.pause();

    //await browser.close();


    let contexts =  browser.contexts();  //[c1, c2]

    console.log(contexts.length);
    contexts[0].


    //await p2.goto("https://udemy.com");
*/




})

test.skip("tc2", async ({context}) =>{

    //let c1 = await browser.newContext();  //a new chrome session

    let p1 = await context.newPage();

    await p1.goto("https://podtest.in");

    let p2 = await context.newPage();

    await p2.goto("https://youtube.com");

    for(const p of context.pages()){ // [page1, page2]
        let title = await p.title();
        console.log("page title is: ", title);
    }
    let cookie1: Cookie = {
        name: 'podtest',
        value: 'Platform for aspiring SDETs to learn ',
        path: '/',
        expires: Math.floor(Date.now() / 1000) + 3600,
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
        domain: 'localhost'
    }


    let c2: Cookie = {
        name: 'example-cookie', // Cookie name
        value: 'cookie-value', // Cookie value
        domain: 'example.com', // The domain for which the cookie is valid
        path: '/', // Path within the domain where the cookie is valid
        httpOnly: true, // Set to true if the cookie is HTTP only
        secure: true, // Set to true if the cookie is secure
        sameSite: 'Strict',
        expires: Math.floor(Date.now() / 1000) + 3600
    }

    let c3: Cookie = {
            name: 'GPS2',
    value: '1',
    domain: '.youtube.com',
    path: '/',
    expires: 1743483616.562259,
    httpOnly: true,
    secure: true,
    sameSite: 'Lax'
    }

    await context.addCookies([c3]);

    

    let cookies = await context.cookies();
    for (const c of cookies){
        console.log("cookie is: ", c);
    }

    await context.clearCookies();

    await p1.pause();

    let cookies2 = await context.cookies();
if(cookies2.length == 0) {
    console.log("no cookies");
}

    for (const c of cookies2){
        console.log("cookie is: ", c);
    }

    //console.log("pages opend are: ", pages.length);


   


})

test.skip("tc3", async ({context, browser, page}) =>{

    /*
    const newBCPromise = context.waitForEvent('close');   
    console.log("pre Bc count is", browser.contexts().length);
    
    await context.close();
    let bc2 = await newBCPromise;
    console.log("post Bc count is", browser.contexts().length);

   // await p1.goto("https://podtest.in");
   
   let newPagePromise = context.waitForEvent('page');   
   console.log("pre page count is", context.pages().length);
   
   await context.newPage();
   let p2 = await newPagePromise;
   await p2.goto("https://podtest.in");

   await context.newPage();

   let p3 = await newPagePromise;
   await p3.goto("https://youtube.com");
   //console.log("post Bc count is", browser.contexts().length);
*/    

   let cmPromise = context.waitForEvent('console');
   await page.goto("https://podtest.in");
    await page.evaluate(()=>{console.log("Hello Akhil")})
    await page.evaluate(()=>{console.log("Hello Shilpi")})

    let cMessage = await cmPromise;
    let p = cMessage.page()
    console.log("page title is",await p?.title());
    console.log("gtext is: ",cMessage.text());


/*
context.on('console' ,  (cm)=>{
    console.log("logged message is: ", cm.text());
});
await page.goto("https://podtest.in");
 await page.evaluate(()=>{console.log("Hello Akhil")})
 await page.evaluate(()=>{console.log("Hello Shilpi")})
*/



})

test.skip("tc4", async ({context, browser})=>{

    

    context.on("close", async ()=>{
      //c3 = await browser.newContext();
      if (browser.isConnected()) {
        console.log("Browser is stil connected!");
        let c3 : BrowserContext = await browser.newContext();
        let p2 = await c3.newPage();
        await p2.goto("https://udemy.com");
      }

       console.log("browserContext got closed!"); 
    })

    console.log("Execution started!")

    let p1 = await context.newPage();
    await p1.goto("https://podtest.in");

    //console.log(c3); 

    await context.close();

    console.log("Execution ended!");

   

    //console.log(c3); 
/*
    let c2 = await browser.newContext();

    console.log("Execution started Again!")

    let p3 = await c2.newPage();

    await p3.goto("https://youtube.com");

    await c2.close();

    console.log("Execution Ended Again!")
*/






})


test.skip("tc5", async ({context, page})=>{

    context.on('page', async (p)=>{
        let viewport = p.viewportSize()
        await p.goto("https://youtube.com");

        console.log("New Page created!", viewport);
    })

    let p1 = await context.newPage();

    let p2 = await context.newPage();

    await page.pause();
})


test.skip("tc6", async ({context})=>{

    context.on('console', async (cm) =>{

        let p2 = cm.page();
        let title = await p2?.title();
        await p2?.goto("https://udemy.com");


        if (title.includes("PodTest")){

            console.log(cm.text(), cm.type(), title);
        }               
        //console.log("Console event triggered!")
    })

    let p1 = await context.newPage();
    await p1.goto("https://podtest.in");

    await p1.evaluate(()=>{
        console.log("Akhil jain");
    })

    await p1.pause();

})


test.skip("tc7", async ({context})=>{

    //step1:  registering a listener
    /*
    context.on("console", 
       async (cm)=>{               
        console.log("new console receieved created!", cm.text() );
      }        
    )
      */

    let cm =  context.waitForEvent('console');

    let p1 = await context.newPage();
    await p1.goto("https://podtest.in")    ;

    await p1.evaluate(()=>{
        console.log("Hello Akhil");
    })

    console.log("new console receieved created!",(await cm).text());

    let cm2 =  context.waitForEvent('console');

    await p1.evaluate(()=>{
        console.log("Hello podtest");
    })

    console.log("new console receieved created!",(await cm2).text());


   







    
    
//step1: registering a listener
    //let p =  context.waitForEvent('page');

    //step2 :event fired & listerner would be notified
    //let p1 = await context.newPage();

/*
    await (await p).goto("https://youtube.com");

    let p2 = await context.newPage();

    await (await p).goto("https://youtube.com");

    await (await p).pause();


    //await p1.goto("https://podtest.in")

    //let p2 = await context.newPage();
    //await p2.goto("https://udemy.com")
    */
})

test.skip("tc8",async ({page})=>{
   
    await page.goto("https://demo.evershop.io/account/login");

    let loc =  page.locator("//input[@name='email']");
    await loc.fill("akhiljda@gmail.com");

    page.getByAltText("Akhil Jain", {exact: false});

    //page.getByLabel()

    await page.locator("[name='password']").fill("Password");

    await page.locator("button[type='submit']").click();

    await page.pause();
})

//import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.locator('body').click({
    button: 'right'
  });
  await page.locator('body').click();
  await page.locator('body').click();
  await page.goto('https://demo.evershop.io/account/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).dblclick();
  await page.getByRole('textbox', { name: 'Email' }).fill('akhiljda@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password');
  await page.getByRole('textbox', { name: 'Password' }).press('Tab');
  await page.getByRole('button', { name: 'SIGN IN' }).press('Enter');
  await page.getByRole('button', { name: 'SIGN IN' }).click();

  
});


test.skip("tc10",async ({page})=>{
   
    await page.goto("https://demo.evershop.io/account/login");

    await page.getByPlaceholder("Email", {exact: true}).fill("akhiljda@gmail.com");

   // await page.pause();

   
});

test.skip("tc13",async ({page, context})=>{

    //context.waitForEvent()
   
    await page.setViewportSize({width: 450, height: 500});

    await page.opener()

    await page.goto("https://demo.evershop.io/account/login");
    
    await context.newPage();

    await context.newPage();

    await page.reload();

    console.log("url is", page.url());

    let title = await  page.title();
    console.log("title is ", title);
    
    await page.bringToFront();

    await page.goto("https://facebook.com");

    await page.close();

    let isClosed = page.isClosed();
    console.log("Is it closed?: ",isClosed);

    console.log("vpsize", page.viewportSize());

    


    
    await page.getByPlaceholder("Email", {exact: true}).fill("akhiljda@gmail.com");

   // await page.pause();

   
});

test.skip("tc14", async ({page})=>{

    let browserContext = page.context();

    await page.goto("https://facebook.com");

    await page.reload();

    console.log("url opened is:", page.url());

    let title = await page.title();
    console.log("title is:", title);

    await page.goto("https://podtest.in");

    await page.goBack();

    await page.goForward();

    let isClosed = page.isClosed();

    console.log("Is my page closed?", isClosed);

    await page.close();

    isClosed = page.isClosed();

    console.log("Is my page closed now?", isClosed);

    let p2 = await browserContext.newPage();

    await p2.goto("https://youtube.com/@podtest");

});

test.skip("tc15", async ({page})=>{

    await page.goto("https://podtest.in");

    let p2 = await page.context().newPage();

    await p2.goto("https://facebook.com")

    let p3 = await page.context().newPage();

    await page.goto("https://youtube.com");    

    await page.bringToFront();

    console.log("size of p1 is: ",page.viewportSize())

    await page.setViewportSize({width: 500, height: 400});

    console.log("size of p1 is: ",page.viewportSize())

    console.log("size of p2 is: ",p2.viewportSize())

    await page.pause();



   

})

test.skip("tc16", async ({page})=>{
    await page.goto("https://demo.evershop.io/account/login",{waitUntil: "networkidle"});

    await page.locator("[name='email']").fill("akhiljda@gmail.com");

    await page.pause();


})

test.skip("tc17", async ({page})=>{

    /*
    page.on('domcontentloaded', async (page)=>{       
        console.log("domcontentloaded");
    })
        */

    let p2 = page.waitForEvent('domcontentloaded');

    await page.goto("https://demo.evershop.io/account/login");

    let title = await (await p2).title();
    console.log("Title of the page is: ", title);

    await page.goto("https://youtube.com");

    //await page.locator("[name='email']").fill("akhiljda@gmail.com");

    await page.pause();


})

test.skip("tc18", async ({page})=>{


    await page.goto("https://demo.evershop.io/account/login",{waitUntil: 'domcontentloaded'});

    await page.waitForLoadState('load');



   // let title = await (await p2).title();
   // console.log("Title of the page is: ", title);

    await page.goto("https://youtube.com");

    //await page.locator("[name='email']").fill("akhiljda@gmail.com");

    await page.pause();


})

test.skip("tc19", async ({page})=>{
  await page.goto("https://demo.evershop.io/account/login");
  /*  
  let l1 = page.locator("[name='email']");    

    await l1.fill("akhil");
    await l1.clear();

    let bb = await l1.boundingBox();

    console.log("boundingBox: ", bb);
*/
   let l1 = page.locator("input");

   let count = await l1.count();

   console.log("ele count", count);

   for(const ele of await l1.all()){

        await ele.fill("Podtest")
   }

   await l1.nth(0).fill("akhil");

    await l1.first().fill("Jain");

    await l1.last().fill("Udemy");

    let p1 = l1.page();

    let l2 = page.locator("button[type='submit']");

    let classtext = await l2.getAttribute("class");

    console.log("clastextx is:", classtext); //buuton primary

    console.log("inner HTML is:", await l2.innerHTML()); //<span>sign in</span>
    console.log("inner text is:", await l2.innerText()); //sign in

    console.log("isEnabled:", await l2.isEnabled()); //gt
    console.log("isDisabled:", await l2.isHidden()); //f



    




    await page.pause();
})

test.skip("tc20", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("input#monday").check();

    await page.pause();
    
    await page.locator("input#monday").uncheck();

})

test.skip("tc21", async ({page})=>{
    await page.goto("https://demo.evershop.io/account/login");

    await page.locator("input[name='email']").fill("akhiljda@gmail.com");
    await page.locator("input[name='password']").fill("Password");
    await page.locator("button[type='submit']").click();

    await page.waitForSelector("//a/span[text()='Shop kids']");

    await page.waitForLoadState("load");

    await page.goto("https://demo.evershop.io/checkout");
    //await page.locator("select[id='address[country]']").selectOption("CN");

    await page.locator("select[id='address[country]']").click();
    //await page.waitForTimeout(10000);
    let eles = await page.locator("select[id='address[country]'] option").all();

    for(const ele of eles){
        console.log("country name is:", await ele.innerText());
    }
    await page.locator("//option[@value='CN']").click({force: true});
    await page.locator("select[id='address[country]']").click();

    await page.pause();
})


test.skip("tc25", async ({page})=>{
    await page.goto("https://www.globalsqa.com/demo-site/select-dropdown-menu/");
    await page.locator("//select").click();

    await page.waitForSelector("//option[text()='Andorra']");

    await page.locator("//option[text()='Andorra']").click();
    await page.locator("//select").click();

    await page.pause();
})


test.skip("tc26", async ({page, context})=>{

    context.setDefaultNavigationTimeout(40000);
    context.setDefaultTimeout(30000);

    page.setDefaultNavigationTimeout(30000);
    page.setDefaultTimeout(20000);

    let p2 = await context.newPage();

    p2.goto("https://podtest.in")
    test.setTimeout(20000);

    await page.goto("https://demo.evershop.io/account/login");  //per action level


    await page.goto("https://demo.evershop.io/account/login");  //per action level

    //await page.goto("https://youtube.com/@podtest");  //no timeoit

    let l1 = page.locator("input[name='email']");

    await l1.fill("akhil"); //auto waiting
})

test.skip("tc27", async ({page})=>{


    await page.goto("https://demo.evershop.io/account/login");

    await page.locator("input[name='email']").fill("akhiljda@gmail.com");
    await page.locator("input[name='password']").fill("Password");
    await page.locator("button[type='submit']").click();

    let l1 = page.locator("//a/span[text()='Shop kids']");

    await l1.waitFor({state: 'visible', timeout: 50000});
    await page.goto("https://demo.evershop.io/cart");

    let headers = await page.locator(".items-table thead tr td").all();
    let headerCount = await page.locator(".items-table thead tr td").count();

    console.log("Headers count is:", headerCount);
    console.log("header count is", headers.length);

    let headerName: string[] =[];


    for(const header of headers){
        let val = await header.locator("span").innerText();
        console.log("col name is:", val);
        headerName.push(val);
    }

    console.log("header array is:", headerName);

    headerName.forEach(e=>console.log("header is:" ,e));

    let rows = await page.locator(".items-table tbody tr").all();

    //work on row1

    let rowsData : string[][] = [];

    for(const row of rows){
        let cols = await row.locator("td").all();

        let rowData: string[] = [];
        rowData.push(await cols[0].locator("div.cart-tem-info a.name").innerText());
        rowData.push(await cols[1].locator("span.sale-price").innerText());
        rowData.push(await cols[2].locator("input[type='text']").getAttribute("value")?? "0");
        rowData.push(await cols[3].locator("span").innerText());

        rowsData.push(rowData);
    }

    console.log("Table data is:", rowsData);
    


})


test.skip("tc28_dropdown", async ({page})=>{

    await page.goto("https://demo.evershop.io/account/login");

    await page.locator("input[name='email']").fill("akhiljda@gmail.com");
    await page.locator("input[name='password']").fill("Password");
    await page.locator("button[type='submit']").click();

    let l1 = page.locator("//a/span[text()='Shop kids']");

    await l1.waitFor({state: 'visible', timeout: 50000});
    await page.goto("https://demo.evershop.io/checkout");

    await page.locator("//select[@id='address[country]']").selectOption("CN");
    await page.locator("//select[@id='address[country]']").selectOption({label: 'India'});

    await page.pause();

})

test.skip("tc29_webtable", async ({page})=>{

    await page.goto("https://demo.evershop.io/account/login");

    await page.locator("input[name='email']").fill("akhiljda@gmail.com");
    await page.locator("input[name='password']").fill("Password");
    await page.locator("button[type='submit']").click();

    let l1 = page.locator("//a/span[text()='Shop kids']");

    await l1.waitFor({state: 'visible', timeout: 50000});
    await page.goto("https://demo.evershop.io/cart");

    let columnCount = await page.locator("table thead tr td").count();
    console.log("Coulmn count is:", columnCount);

    let columns = await page.locator("table thead tr td").all();

    let columnNames : string[] = [];

    /*
    await columns.map(async (column)=>{
        let columnName = await column.locator("span").innerText();
        console.log("Map: columnName is:", columnName);
        columnNames.push(columnName);
    })

    columnNames.forEach((colName)=>{
        console.log("column name is:", colName);
    })
*/
    
    for(const column of columns){
        let columnName = await column.locator("span").innerText();
        columnNames.push(columnName);
       //console.log("Col name is", );
    }

    columnNames.forEach((colName)=>{
        console.log("column name is:", colName);
    })


    //Row data:
    let rowCount = await page.locator("table tbody tr").count();
    console.log("RowCount is: ", rowCount);


    let rows = await page.locator("table tbody tr").all();

    let rowsContent : string[][] = [];

    for(const row of rows){

        let rowContent: string[] =[];

        rowContent.push(await row.locator("//td[1]//div[@class='cart-tem-info']/a").innerText());
        rowContent.push(await row.locator("//td[2]//div/span[@class='sale-price']").innerText());
        rowContent.push(await row.locator("//td[3]//input").getAttribute("value")??"no data");
        rowContent.push(await row.locator("//td[4]//span").innerText());   
        
        rowsContent.push(rowContent);
    }

    rowsContent.forEach((row)=>{
        console.log("Row data : ", row);
    })


    await page.pause();

})

test.skip("tabs", async ({page})=>{

    await page.goto("https://selectorshub.com/xpath-practice-page/");
    const newPagePromise = page.context().waitForEvent('page')
    await page.locator("(//a[contains(@href,'testrigor')])[2]").click();
    const newPage = await newPagePromise;
   
    let pages = page.context().pages();
    console.log("pages count ", pages.length);

    for(const p of pages){
        let title = await p.title();
        console.log("title is",title);

        if(title.includes('Xpath')){
            console.log("I went here!");
            await p.bringToFront();
        }
    }

    await page.pause();







})

test("iframes", async ({page})=>{
    await page.goto("https://selectorshub.com/iframe-scenario/");


    const frame1 = page.frameLocator('#pact1')

    await frame1.locator("input[placeholder='First Crush']").fill("Akhil Jain");
    //await page.locator("input[placeholder='First Crush']").fill("Akhil Jain");

    const frame2 = frame1.frameLocator('#pact2')

    await frame2.locator("input[placeholder='Current Crush Name']").fill("podtest");
    

    await page.pause();
} )