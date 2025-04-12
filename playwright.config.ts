import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  
  fullyParallel: false,
  globalTimeout: 360000,
  timeout: 40*1000,
  globalSetup: require.resolve('./globalsetup.ts'),
  globalTeardown: require.resolve('./globalteardown.ts'),
  testMatch: ['tests/tf1.spec.ts'],  //relative to the config file
  
  //testIgnore: ['tests/tf2.spec.ts'],
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: 'https://youtube.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: false, 
    navigationTimeout: 40000,
    actionTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [

    /*{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    */

    {
        name: 'setupproject',
        use: { ...devices['Desktop Chrome'], channel: "chrome",
          baseURL: "https://udemy.com"
        },
        testMatch: ['tests/tf3.spec.ts']

    },

    {
      name: 'tearDownproject',
      use: { ...devices['Desktop Chrome'], channel: "chrome",
        baseURL: "https://udemy.com"
      },
      testMatch: ['tests/tf4.spec.ts']
    },


    {
      name: 'chrome-Brand-Browser',
      use: { ...devices['Desktop Chrome'], channel: "chrome",
        baseURL: "https://udemy.com"
      }, 
      dependencies: ['setupproject'],
      testMatch: ['tests/tf1.spec.ts'],
      teardown:  'tearDownproject'   
      //testMatch: "./tests/dummy.*"
      
    },

    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: "chrome",
        baseURL: "https://udemy.com"
      },     
      testMatch: ['tests/e2e.spec.ts'],    
      //testMatch: "./tests/dummy.*"
      
    },

    //{
     // name: 'firefox',
     // use: { ...devices['Desktop Firefox'] },
    //},

    /*{
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  expect: {

  }

});
