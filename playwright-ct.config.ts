import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './src',
	testMatch: '**/*.ct.test.tsx',
	timeout: 10 * 1000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		trace: 'on-first-retry',
		screenshot: 'on',
		baseURL: 'http://localhost:5173/playwright/gallery/index.html',
		serviceWorkers: 'block',
		reuseContext: true,
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
	webServer: {
		command: 'pnpm dev',
		url: 'http://localhost:5173/playwright/gallery/index.html',
		reuseExistingServer: !process.env.CI,
	},
});
