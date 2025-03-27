import {test, } from '@playwright/test'


test.use({baseURL: "https://podtest.in"});


test.beforeAll(()=>{
    console.log("Running beforeAll in TF2");
})


test.afterAll(()=>{
    console.log("Running afterAll in TF2");
})


test.beforeEach(({}, testInfo)=>{
    console.log("running beforeeach in TF2 for testcase ", testInfo.title);
})


test.afterEach(({}, testInfo)=>{
    console.log("running afterEach in TF2 for testcase ", testInfo.title);
})

test("testcase3: ", async ({page}, testInfo)=>{
    await page.goto("https://youtube.com/@podtest");
    console.log(testInfo.title, `${testInfo.workerIndex}-${testInfo.parallelIndex}` );
})


test("Testcase4: Login", 
    {tag: "@smoke", 
        annotation: {
            type: 'Test',
            description: 'Dummy test to test Login',
        }
    },

    async ({page, browser }, testInfo   ) =>{

        await page.goto("https://udemy.com");
       // console.log("Global level", testInfo.config);
       // console.log("project level", testInfo.project);

       console.log(testInfo.title, `${testInfo.workerIndex}-${testInfo.parallelIndex}` );


    }
)