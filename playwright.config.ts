import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI 
    ? [
        ['html', { outputFolder: 'playwright-report' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['list']
      ]
    : [
        ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
        ['list']
      ],
  use: {
    baseURL: 'https://www.ebay.com/',
    trace: 'on-first-retry',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    headless: process.env.CI ? true : false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
      },
      testIgnore: /tests\/api\/.*\.spec\.ts/,
    },
  ],
});
