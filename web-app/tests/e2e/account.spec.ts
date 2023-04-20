import dotenv from "dotenv";

const myEnv = dotenv.config({ path: ".env.test" });

import { test, expect } from "@playwright/test";
import { sleep } from "../utility";

test.describe("test account capabilities", () => {
	// Difficult to test the creation of a new account due to requiring a new account (Or deleting account before every test)
	test("signup account exists using input form", async ({ page }) => {
		if (myEnv.parsed == undefined) return;

		// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
		await page.goto("http://localhost:3000/signup");
		// Find an element with the text 'About Page' and click on it
		await page
			.getByPlaceholder("Email")
			.fill(myEnv.parsed.E2E_FORM_USERNAME);
		await page
			.getByPlaceholder("Password", { exact: true })
			.fill(myEnv.parsed.E2E_FORM_PASSWORD);
		await page
			.getByPlaceholder("Confirm your password", { exact: true })
			.fill(myEnv.parsed.E2E_FORM_PASSWORD);

		await page.getByText("Sign up", { exact: true }).click();
		// The new page should contain an h3 with "About Page"
		await expect(page.locator("h5")).toContainText(
			"Account specified already exists."
		);
	});

	test("login successfully using input form", async ({ page }) => {
		if (myEnv.parsed == undefined) return;
		// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
		await page.goto("http://localhost:3000/login");
		// Find an element with the text 'About Page' and click on it

		await page
			.getByPlaceholder("Email")
			.fill(myEnv.parsed.E2E_FORM_USERNAME);
		await page
			.getByPlaceholder("Password")
			.fill(myEnv.parsed.E2E_FORM_PASSWORD);
		await page.getByText("Sign in", { exact: true }).click();
		// // The new URL should be "/about" (baseURL is used there)
		await expect(page).toHaveURL("http://localhost:3000/");
	});

	test("logout of account", async ({ page }) => {
		if (myEnv.parsed == undefined) return;
		// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
		await page.goto("http://localhost:3000/login");
		// Find an element with the text 'About Page' and click on it
		await page
			.getByPlaceholder("Email")
			.fill(myEnv.parsed.E2E_FORM_USERNAME);
		await page
			.getByPlaceholder("Password")
			.fill(myEnv.parsed.E2E_FORM_PASSWORD);
		await page.getByText("Sign in", { exact: true }).click();
		// // The new URL should be "/about" (baseURL is used there)
		await expect(page).toHaveURL("http://localhost:3000/");

		const dropdown = page.getByTestId("dropdown-user");
		await dropdown.click();
		await sleep(2000);
		await page.getByRole("menuitem", { name: "Log Out" }).click();

		await page.click("text=Watchlist");
		// The new URL should be "/about" (baseURL is used there)
		await expect(page).toHaveURL("http://localhost:3000/watchlist");

		expect(
			await page
				.getByText(
					"You must have an account to be able to keep a watchlist"
				)
				.isVisible()
		).toBeTruthy();
	});

	test("delete account", async ({ page }) => {
		if (myEnv.parsed == undefined) return;
		// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
		await page.goto("http://localhost:3000/login");
		// Find an element with the text 'About Page' and click on it
		await page
			.getByPlaceholder("Email")
			.fill(myEnv.parsed.E2E_FORM_USERNAME);
		await page
			.getByPlaceholder("Password")
			.fill(myEnv.parsed.E2E_FORM_PASSWORD);
		await page.getByText("Sign in", { exact: true }).click();
		// // The new URL should be "/about" (baseURL is used there)
		await expect(page).toHaveURL("http://localhost:3000/");

		const dropdown = page.getByTestId("dropdown-user");
		await dropdown.click();
		await sleep(2000);
		await page.getByRole("menuitem", { name: "Account Settings" }).click();

		await page.click("text=Delete Account");
		await page.getByPlaceholder("Type DELETE to confirm").fill("DELETE");
		const locators = page.getByText("Delete Account");
		await locators.nth(1).click();
		await sleep(1000);
		await page.click("text=Watchlist");
		// The new URL should be "/about" (baseURL is used there)
		await expect(page).toHaveURL("http://localhost:3000/watchlist");

		expect(
			await page
				.getByText(
					"You must have an account to be able to keep a watchlist"
				)
				.isVisible()
		).toBeTruthy();
	});
});
