import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';

import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '.env')
});

console.log("url:", process.env.APP_URL);
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
    ['./src/reports/TestRailReporter.ts']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    viewport: { width: 1280, height: 720 }, //just for run ci
  
      
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.APP_URL,
    
    // Stabilities
    actionTimeout: Number(process.env.APP_TIMEOUT_ACTION) || 15000,

    navigationTimeout: Number(process.env.APP_TIMEOUT_NAVIGATE) || 30000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },

  timeout: Number(process.env.APP_TIMEOUT) || 60000,

  expect: {
    timeout: Number(process.env.APP_TIMEOUT_EXPECTED) || 15000
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'setup-chromium',
      testMatch: /.*auth\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome']  
      }
    },
    {
      name: 'setup-firefox',
      testMatch: /.*auth\.setup\.ts/,
      use: {
        ...devices['Desktop Firefox']
      }
    },
    {
        name: 'setup-webkit',
        testMatch: /.*auth\.setup\.ts/,
        use: {
          ...devices['Desktop Safari']
        }
    },
    {
      name: 'login-chromium',
      testMatch: /.*login.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined
      }
    },
    {
      name: 'login-firefox',
      testMatch: /.*login.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        storageState: undefined
      }
    },
    {
      name: 'login-webkit',
      testMatch: /.*login.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        storageState: undefined
      }
    },
    {
      name: 'chromium',
      testIgnore: [
        /.*auth\.setup\.ts/,
        /.*login.*\.spec\.ts/
      ],
      dependencies: ['setup-chromium'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/chromium.json'
      }
    },
    {
      name: 'firefox',
      testIgnore: [
        /.*auth\.setup\.ts/,
        /.*login.*\.spec\.ts/
      ],
      dependencies: ['setup-firefox'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/firefox.json'
      }
    },
    {
      name: 'webkit',
      testIgnore: [
        /.*auth\.setup\.ts/,
        /.*login.*\.spec\.ts/
      ],
      dependencies: ['setup-webkit'],
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/webkit.json'
      }
    },
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

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  // outputDir: 'test-results',
});