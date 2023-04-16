import { test, expect } from "@playwright/test";

test("should navigate to the watchlist page", async ({ page }) => {
	// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/");
	// Find an element with the text 'About Page' and click on it
	await page.click("text=Watchlist");
	// The new URL should be "/about" (baseURL is used there)
	await expect(page).toHaveURL("http://localhost:3000/watchlist");
	// The new page should contain an h3 with "About Page"
	await expect(page.locator("h3")).toContainText("Watchlist");
});

test("should navigate to the about page", async ({ page }) => {
	// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/");
	// Find an element with the text 'About Page' and click on it
	await page.click("text=About");
	// The new URL should be "/about" (baseURL is used there)
	await expect(page).toHaveURL("http://localhost:3000/about");
	// The new page should contain an h3 with "About Page"
	await expect(page.locator("h3")).toContainText("About");
});

test("should navigate to the login page", async ({ page }) => {
	// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/");
	// Find an element with the text 'About Page' and click on it
	await page.click("text=Login");
	// The new URL should be "/about" (baseURL is used there)
	await expect(page).toHaveURL("http://localhost:3000/login");
	// The new page should contain an h3 with "About Page"
	await expect(page.locator("h3")).toContainText("Login");
});
test("should navigate to the signup page", async ({ page }) => {
	// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/");
	// Find an element with the text 'About Page' and click on it
	await page.click("text=Sign Up");
	// The new URL should be "/about" (baseURL is used there)
	await expect(page).toHaveURL("http://localhost:3000/signup");
	// The new page should contain an h3 with "About Page"
	await expect(page.locator("h3")).toContainText("Sign Up");
});

test("search and navigate to bitcoin cryptocurrency page", async ({ page }) => {
	// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/");

	await page.getByRole("textbox").fill("Bitcoin");

	// Find an element with the text 'About Page' and click on it
	await page.click("text=Bitcoin");
	// The new URL should be "/about" (baseURL is used there)
	await expect(page).toHaveURL("http://localhost:3000/currencies/Bitcoin");
	// The new page should contain an h3 with "About Page"
	await expect(page.locator("h2")).toContainText("Bitcoin");
});
