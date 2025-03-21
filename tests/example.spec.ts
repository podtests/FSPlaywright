import { test, expect } from '@playwright/test';

/*
test('tc3', async (param)=> {

    let p1 = param['page'];
  await p1.goto('https://podtest.in');
});
*/

test('tc3', async ({page })=> {
  await page.goto('https://podtest.in');

  let context = page.context();

  let p2 = await context.newPage();

  await p2.goto("https://youtube.com/@podtest");

  let browser = context.browser();
  let c2 = await browser?.newContext();

  let p3 = await c2?.newPage();
  await p3.goto("https://www.udemy.com/course/selenium-java-from-zero-to-hero");


});


