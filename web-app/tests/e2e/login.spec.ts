import dotenv from "dotenv";

const myEnv = dotenv.config({ path: ".env.test" });

import { test, expect } from "@playwright/test";

test("login successfully using input form", async ({ page }) => {
	if (myEnv.parsed == undefined) return;
	// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("http://localhost:3000/login");
	// Find an element with the text 'About Page' and click on it

	await page.getByPlaceholder("Email").fill(myEnv.parsed.E2E_FORM_USERNAME);
	await page
		.getByPlaceholder("Password")
		.fill(myEnv.parsed.E2E_FORM_PASSWORD);
	await page.getByText("Sign in", { exact: true }).click();
	// // The new URL should be "/about" (baseURL is used there)
	await expect(page).toHaveURL("http://localhost:3000/");
});
