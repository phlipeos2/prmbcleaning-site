import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

const windowsChrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  || (process.platform === 'win32' && existsSync(windowsChrome) ? windowsChrome : undefined);
const launchOptions = executablePath ? { executablePath } : {};

export default defineConfig({
  testDir: './tests',
  globalTeardown: './tests/global-teardown.mjs',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    launchOptions,
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'node scripts/serve.mjs',
    url: 'http://127.0.0.1:4173',
    env: { ...process.env, PRMB_TEST_SERVER: '1' },
    reuseExistingServer: false,
    timeout: 15_000
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 5'] } }
  ]
});
