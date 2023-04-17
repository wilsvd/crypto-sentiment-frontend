import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { sleep } from "@/tests/utility";

const myEnv = dotenv.config({ path: ".env.tests" });
// Test id for the unfavourite image
// data-testid="unfavourite-image"

// Test id for the favourite image
// data-testid="favourite-image"

// All the images exist inside this table
// data-testid=crypto-table

// Hacky solution to waiting for the page to load

// Issue with favouriting cryptocurrencies is that when a user favourites it then it is stored in database
// Meaning that if you re-run the test you need to ensure that it is unfavourited after every run
// Will combine the favouriting and unfavourting tests into one then

// Sleep is used to intentially slow down the running of the tests so that components have time to render.
// The inbuilt playwright waiting for components to load does not seem to be working so this is my workaround.

test.describe("Test favouriting of cryptocurrencies of various pages", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/login");
		// Find an element with the text 'About Page' and click on it
		await page.getByPlaceholder("Email").fill(myEnv.parsed.FORM_USERNAME);
		await page
			.getByPlaceholder("Password")
			.fill(myEnv.parsed.FORM_PASSWORD);
		await page.getByText("Sign in", { exact: true }).click();
		await expect(page).toHaveURL("http://localhost:3000/");
		await sleep(1000);
	});

	test("Favouriting/unfavouriting a cryptocurrency on dashboard", async ({
		page,
	}) => {
		const unFavIcon = page.getByTestId("unfavourite-image-Bitcoin");
		const favIcon = page.getByTestId("favourite-image-Bitcoin");

		// If a cryptocurrency is favourited we need to test unfavouriting it
		// If a cryptocurrency is not favourited we need to test favouriting it.
		if ((await unFavIcon.isVisible()) == true) {
			// If unfav is visible then we are testing favouriting a cryptocurrency on dashboard (Still need to unfavourite at the end though)
			await unFavIcon.click();
			await sleep(100);
			expect(await favIcon.isVisible()).toBeTruthy();
			expect(await unFavIcon.isVisible()).toBeFalsy();
			// unfavourite the cryptocurrency to ensure future tests can run correctly
			await favIcon.click();
			await sleep(100);
		} else if ((await favIcon.isVisible()) === true) {
			// If fav is visible then we are testing unfavouriting a cryptocurrency on dashboard
			await favIcon.click();
			await sleep(100);
			expect(await favIcon.isVisible()).toBeFalsy();
			expect(await unFavIcon.isVisible()).toBeTruthy();
		}
	});

	test("Favouriting a cryptocurrency on dashboard and unfavouriting on watchlist", async ({
		page,
	}) => {
		// Dashboard Icons
		const dashUnFavIcon = page.getByTestId("unfavourite-image-Bitcoin");
		const dashFavIcon = page.getByTestId("favourite-image-Bitcoin");

		// If account logged into has the cryptocurrency unfavourited we need to favourite it to test the unfavouriting
		if ((await dashUnFavIcon.isVisible()) == true) {
			expect(await dashUnFavIcon.isVisible()).toBeTruthy();
			await dashUnFavIcon.click();
			await sleep(100);
			expect(await dashFavIcon.isVisible()).toBeTruthy();
		}
		await page.click("text=Watchlist");
		await expect(page).toHaveURL("http://localhost:3000/watchlist");
		await sleep(100);
		// Checking on the WatchList page that the cryptocurrency is set to True
		const watchFavIcon = page.getByTestId("favourite-image-Bitcoin");
		expect(await watchFavIcon.isVisible()).toBeTruthy();
		await watchFavIcon.click();
		await sleep(100);

		const textDisplay = page.locator("h5", {
			hasText:
				"You have not added any cryptocurrencies to your watchlist",
		});
		expect(await textDisplay.isVisible()).toBeTruthy();
	});

	test("Favouriting/unfavouriting a cryptocurrency on the crypto page", async ({
		page,
	}) => {
		// Navigate using the Dashboard
		await page.click("text=Bitcoin");
		await expect(page).toHaveURL(
			"http://localhost:3000/currencies/Bitcoin"
		);

		const unFavIcon = page.getByTestId("unfavourite-image-Bitcoin");
		const favIcon = page.getByTestId("favourite-image-Bitcoin");

		// If a cryptocurrency is favourited we need to test unfavouriting it
		// If a cryptocurrency is not favourited we need to test favouriting it.
		if ((await unFavIcon.isVisible()) == true) {
			// If unfav is visible then we are testing favouriting a cryptocurrency on dashboard (Still need to unfavourite at the end though)
			await unFavIcon.click();
			await sleep(100);
			expect(await favIcon.isVisible()).toBeTruthy();
			expect(await unFavIcon.isVisible()).toBeFalsy();
			// unfavourite the cryptocurrency to ensure future tests can run correctly
			await favIcon.click();
			await sleep(100);
		} else if ((await favIcon.isVisible()) === true) {
			// If fav is visible then we are testing unfavouriting a cryptocurrency on dashboard
			await favIcon.click();
			await sleep(100);
			expect(await favIcon.isVisible()).toBeFalsy();
			expect(await unFavIcon.isVisible()).toBeTruthy();
		}
	});
});
