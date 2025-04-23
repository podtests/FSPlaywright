import {test} from '@playwright/test'

test("setup test", async ({page})=>{
    console.log("running setup test");
    await page.goto('https://podtest.in');
})