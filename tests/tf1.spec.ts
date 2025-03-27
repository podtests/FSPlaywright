import {test, } from '@playwright/test'


test.use({baseURL: "https://podtest.in"});


test.beforeAll(()=>{
    console.log("Running beforeAll in TF1");
})


test.afterAll(()=>{
    console.log("Running afterAll in TF1");
})


test.beforeEach(({}, testInfo)=>{
    console.log("running beforeeach in TF1 for testcase ", testInfo.title);
})


test.afterEach(({}, testInfo)=>{
    console.log("running afterEach in TF1 for testcase ", testInfo.title);
})

test("Testcase1: Login", 
    {tag: "@smoke", 
        annotation: {
            type: 'Test',
            description: 'Dummy test to test Login',
        }
    },

    async ({page, browser }, testInfo   ) =>{

        await page.goto("/");
      //  console.log("Global level", testInfo.config);
      //  console.log("project level", testInfo.project);

      console.log(testInfo.title, `${testInfo.workerIndex}-${testInfo.parallelIndex}` );


    }
)

test("testcase2: ", async ({page}, testInfo)=>{
    await page.goto("https://youtube.com");
    console.log(testInfo.title, `${testInfo.workerIndex}-${testInfo.parallelIndex}` );
    //console.log(testInfo.title,);
})


