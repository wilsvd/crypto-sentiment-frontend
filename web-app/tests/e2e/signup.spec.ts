const dotenv = require("dotenv");

const myEnv = dotenv.config({ path: ".env.tests" });

import { test, expect } from "@playwright/test";

// Difficult to test the creation of a new account due to requiring a new account (Or deleting account before every test)
test("signup account exists using input form", async ({ page }) => {
	// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/signup");
	// Find an element with the text 'About Page' and click on it
	await page.getByPlaceholder("Email").fill(myEnv.parsed.FORM_USERNAME);
	await page
		.getByPlaceholder("Password", { exact: true })
		.fill(myEnv.parsed.FORM_PASSWORD);
	await page
		.getByPlaceholder("Confirm your password", { exact: true })
		.fill(myEnv.parsed.FORM_PASSWORD);

	await page.getByText("Sign up", { exact: true }).click();
	// The new page should contain an h3 with "About Page"
	await expect(page.locator("h5")).toContainText(
		"Account specified already exists."
	);
});
