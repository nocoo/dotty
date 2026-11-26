import { expect, test } from "@playwright/test";

test.describe("Dotty SPA smoke", () => {
	test("renders dashboard and live metadata without runtime errors", async ({ page }) => {
		const pageErrors: string[] = [];
		const consoleErrors: string[] = [];

		page.on("pageerror", (error) => {
			pageErrors.push(error.message);
		});
		page.on("console", (msg) => {
			if (msg.type() === "error") {
				consoleErrors.push(msg.text());
			}
		});

		await page.goto("/");

		await expect(page).toHaveTitle("Dotty");
		await expect(page.locator("aside")).toContainText("dotty.");
		await expect(page.locator("main#main-content")).toBeVisible();
		await expect(page.locator("header nav")).toContainText("Dashboard");

		const liveRes = await page.request.get("/api/live.json");
		expect(liveRes.ok()).toBe(true);
		const liveJson = (await liveRes.json()) as { status: string; version: string };
		expect(liveJson.status).toBe("ok");
		expect(liveJson.version).toMatch(/^\d+\.\d+\.\d+/);

		expect(pageErrors).toEqual([]);
		expect(consoleErrors).toEqual([]);
	});

	test("navigates across routes and toggles interactive controls", async ({ page }) => {
		const pageErrors: string[] = [];
		page.on("pageerror", (error) => {
			pageErrors.push(error.message);
		});

		await page.goto("/");

		await page.locator("aside nav").getByRole("button", { name: "Components" }).click();
		await expect(page).toHaveURL(/\/components$/);
		await expect(page.locator("header nav")).toContainText("Components");

		await page.locator("aside nav").getByRole("button", { name: "Settings" }).click();
		await expect(page).toHaveURL(/\/settings$/);
		await expect(page.locator("header nav")).toContainText("Settings");

		await page.getByRole("button", { name: "Collapse sidebar" }).click();
		await expect(page.getByRole("button", { name: "Expand sidebar" })).toBeVisible();
		await page.getByRole("button", { name: "Expand sidebar" }).click();
		await expect(page.getByRole("button", { name: "Collapse sidebar" })).toBeVisible();

		const themeButton = page.getByRole("button", { name: /Toggle theme/i });
		await themeButton.click();
		await expect(page.locator("html")).toHaveClass(/light/);
		await themeButton.click();
		await expect(page.locator("html")).toHaveClass(/dark/);

		await page
			.locator("aside")
			.getByRole("button", { name: /Search/i })
			.click();
		const searchInput = page.getByPlaceholder("Search pages...");
		await expect(searchInput).toBeVisible();
		await searchInput.fill("Accounts");
		await page.getByRole("option", { name: "Accounts" }).click();
		await expect(page).toHaveURL(/\/accounts$/);
		await expect(page.locator("header nav")).toContainText("Accounts");

		expect(pageErrors).toEqual([]);
	});
});
