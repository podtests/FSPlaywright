import {BrowserContext, Cookie, Page, test} from '@playwright/test';

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


test("tc7", async ({context})=>{
/*
    //step1:  registering a listener
    context.on("page", 
        
        //step3: action to be taken
        (p)=>{
        console.log("new page created!");        
    }
)
*/
    
    
//step1: registering a listener
    let p =  context.waitForEvent('page');

    //step2 :event fired & listerner would be notified
    let p1 = await context.newPage();

    await (await p).goto("https://youtube.com");

    let p2 = await context.newPage();

    await (await p).goto("https://youtube.com");

    await (await p).pause();


    //await p1.goto("https://podtest.in")

    //let p2 = await context.newPage();
    //await p2.goto("https://udemy.com")
})