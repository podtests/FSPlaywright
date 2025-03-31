import {BrowserContext, test} from '@playwright/test';

test("tc1", async ({ browser  })=>{


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