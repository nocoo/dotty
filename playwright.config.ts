import { defineConfig, devices } from "@playwright/test";

const port = process.env.PORT ?? "4173";
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [["github"], ["list"]] : "list",
	use: {
		baseURL,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: {
		command: `bun run preview -- --host 127.0.0.1 --port ${port} --strictPort`,
		url: baseURL,
		reuseExistingServer: !process.env.CI,
	},
});
