import { test, expect } from "@playwright/test";
import { sleep } from "@/tests/utility";

test.describe("test crypto page drown menu for historical chart", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/currencies/Bitcoin");
		await sleep(1000);
	});

	test("Change the historical chart dropdown to last week", async ({
		page,
	}) => {
		const locator = page.getByTestId("crypto-chart-selector");
		await locator.selectOption({ value: "week" });

		const result = await locator.evaluate(
			(sel: HTMLSelectElement) =>
				sel.options[sel.options.selectedIndex].textContent
		);
		expect(result).toBe("7 Days");
	});

	test("Change the historical chart dropdown to one day", async ({
		page,
	}) => {
		const locator = page.getByTestId("crypto-chart-selector");
		await locator.selectOption({ value: "day" });

		const result = await locator.evaluate(
			(sel: HTMLSelectElement) =>
				sel.options[sel.options.selectedIndex].textContent
		);
		expect(result).toBe("1 Day");
	});

	test("Change the historical chart dropdown to one month", async ({
		page,
	}) => {
		const locator = page.getByTestId("crypto-chart-selector");
		// Default setting is month so check if can transition from weeks to month.
		await locator.selectOption({ value: "week" });
		await locator.selectOption({ value: "month" });

		const result = await locator.evaluate(
			(sel: HTMLSelectElement) =>
				sel.options[sel.options.selectedIndex].textContent
		);
		expect(result).toBe("1 Month");
	});
});

test.describe("test navigation from bitcoin page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/currencies/Bitcoin");
		await sleep(1000);
	});

	test("Navigate to alternative cryptocurrency page", async ({ page }) => {
		const searcBar = page.getByTestId("big-screen-navbar-search-input");
		await searcBar.fill("Ethereum");
		await sleep(2000);
		const table = page.getByTestId(
			"big-screen-navbar-search-result-container"
		);

		await table
			.getByRole("link", { name: "Ethereum", exact: true })
			.click();

		await expect(page).toHaveURL(
			"http://localhost:3000/currencies/Ethereum"
		);
	});

	test("Click on the subreddit link provided", async ({ page }) => {
		// Click on the link
		const locator = page.getByTestId("testimonial-subreddit-link");
		await locator.click();

		// After clicking the link a new tab will be opened.
		// Start waiting for new page before clicking. Note no await.

		const [newPage] = await Promise.all([
			new Promise((resolve) => page.once("popup", resolve)),
			// Clicking the link should open a new page. If it doesn't, the test will fail here.
		]);

		// Check if the new tab has the URL "https://www.reddit.com/r/bitcoin/"
		const url = await newPage.url();
		expect(url).toBe("https://www.reddit.com/r/bitcoin/");

		// Close the new tab
		await newPage.close();
	});
});
