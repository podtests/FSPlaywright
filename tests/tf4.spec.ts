import {test} from '@playwright/test'

test("teardown test", async ({page})=>{
    console.log("running teardown test");
    await page.goto('https://udemy.com');
})