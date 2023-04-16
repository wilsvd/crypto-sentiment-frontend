import { test, expect } from "@playwright/test";

test("Favourite a cryptocurrency on dashboard", async ({ page }) => {
	// // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/");
	// // Find an element with the text 'About Page' and click on it
	// await page.click("text=Watchlist");
	// // The new URL should be "/about" (baseURL is used there)
	// await expect(page).toHaveURL("http://localhost:3000/watchlist");
	// // The new page should contain an h3 with "About Page"
	// await expect(page.locator("h3")).toContainText("Watchlist");
});

test("Unfavourite a cryptocurrency on dashboard", async ({ page }) => {
	// // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/");
	// // Find an element with the text 'About Page' and click on it
	// await page.click("text=Watchlist");
	// // The new URL should be "/about" (baseURL is used there)
	// await expect(page).toHaveURL("http://localhost:3000/watchlist");
	// // The new page should contain an h3 with "About Page"
	// await expect(page.locator("h3")).toContainText("Watchlist");
});

test("Unfavourite a cryptocurrency on watchlist", async ({ page }) => {
	// FAVOURITE CRYPTO FIRST SO WE CAN UNFAVOURITE LATER

	// // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/");
	// Favourite cryptocurrency
	// 		LOGIC
	// Client side route
	// 		LOGIC
	// Unfavourite cryptocurrency
	// 		LOGIC
	// Check it is unfavourited
	// await page.click("text=Watchlist");
	// // The new URL should be "/about" (baseURL is used there)
	// await expect(page).toHaveURL("http://localhost:3000/watchlist");
	// // The new page should contain an h3 with "About Page"
	// await expect(page.locator("h3")).toContainText("Watchlist");
});
test("Favourite a cryptocurrency on the crypto page", async ({ page }) => {
	// // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/watchlist");
	// // Find an element with the text 'About Page' and click on it
	// await page.click("text=Watchlist");
	// // The new URL should be "/about" (baseURL is used there)
	// await expect(page).toHaveURL("http://localhost:3000/watchlist");
	// // The new page should contain an h3 with "About Page"
	// await expect(page.locator("h3")).toContainText("Watchlist");
});

test("Unfavourite a cryptocurrency on the crypto page", async ({ page }) => {
	// // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/watchlist");
	// // Find an element with the text 'About Page' and click on it
	// await page.click("text=Watchlist");
	// // The new URL should be "/about" (baseURL is used there)
	// await expect(page).toHaveURL("http://localhost:3000/watchlist");
	// // The new page should contain an h3 with "About Page"
	// await expect(page.locator("h3")).toContainText("Watchlist");
});
