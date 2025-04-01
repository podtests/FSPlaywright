import {BrowserContext, Cookie, test} from '@playwright/test';

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

test("tc2", async ({context}) =>{

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