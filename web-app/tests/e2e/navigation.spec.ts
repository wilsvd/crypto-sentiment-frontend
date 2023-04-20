import { test, expect } from "@playwright/test";
import { sleep } from "@/tests/utility";

test.describe("Test navigation to different pages from navbar", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/");
	});

	test("Navigate to the watchlist page", async ({ page }) => {
		// Find an element with the text 'About Page' and click on it
		await page.click("text=Watchlist");
		// The new URL should be "/about" (baseURL is used there)
		await expect(page).toHaveURL("http://localhost:3000/watchlist");
	});

	test("Navigate to the about page", async ({ page }) => {
		// Find an element with the text 'About Page' and click on it
		await page.click("text=About");
		// The new URL should be "/about" (baseURL is used there)
		await expect(page).toHaveURL("http://localhost:3000/about");
	});

	test("Navigate to the login page", async ({ page }) => {
		// Find an element with the text 'About Page' and click on it
		await page.click("text=Login");
		// The new URL should be "/about" (baseURL is used there)
		await expect(page).toHaveURL("http://localhost:3000/login");
	});
	test("Navigate to the signup page", async ({ page }) => {
		// Find an element with the text 'About Page' and click on it
		await page.click("text=Sign Up");
		// The new URL should be "/about" (baseURL is used there)
		await expect(page).toHaveURL("http://localhost:3000/signup");
	});

	test("Search and navigate to bitcoin cryptocurrency page", async ({
		page,
	}) => {
		await sleep(1000);

		const searcBar = page.getByTestId("big-screen-navbar-search-input");
		await searcBar.fill("Bitcoin");
		await sleep(1000);
		const table = page.getByTestId(
			"big-screen-navbar-search-result-container"
		);

		await table.getByRole("link", { name: "Bitcoin", exact: true }).click();

		await expect(page).toHaveURL(
			"http://localhost:3000/currencies/Bitcoin"
		);
	});
});
