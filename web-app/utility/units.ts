// This file is purely to make Unit Testing Easier due to constant problems with imports of other files

import { CryptoData } from "@/store/cryptoslice";
import { SentimentHistory } from "./firestore";

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// CryptoGauge functions
//
// Keeping all constants for understanding the mapping
const EXTREME_LEFT_OG = -1;
const EXTREME_RIGHT_OG = 1;
const EXTREME_LEFT_NEW = 0;
const EXTREME_RIGHT_NEW = 1;
/**
 * Mapping function for Crypto Gauge.
 *
 * @remarks
 * The function maps the range of input gauge value from (-1, 1) to (0, 1).
 *
 * @param {number} oldGauge - The input gauge value in the range of (-1, 1).
 * @returns {number} The output gauge value in the range of (0, 1).
 */
export function mapping(oldGauge: number): number {
	// SLOPE = (EXTREME_RIGHT_NEW - EXTREME_LEFT_NEW) / (EXTREME_RIGHT_OG - EXTREME_LEFT_OG)
	// EXTREME_LEFT_NEW + (SLOPE) * (oldGauge - EXTREME_LEFT_OG)
	const newGauge = 0.5 * (oldGauge + 1);
	return newGauge;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// CryptoChart functions
//

// Labels are set according to the value.datetime
// If the date chosen is in the last day
// -	Show the time of the data (We know this is going to be a 00:00 or 12:00)
// If the date chosen is in the last 7 days
// 	-	Show a number which represents the date.
// If the date chosen is in the last month days
// -	Show the date of the month

// It should show a different value if the timespan crosses the month threshold
// If the last day is selected but 7 hours ago it became April then it should show April
// If the last 7 days is selected but 3 days ago it became April then it should April
// If the last month is selected but 20 days ago it became April then it should show April

// Date Format
// Day, Month, Year, (Time)
// If the time is 00:00
// 		If the day coincides with being a new month
// 			Show the month
// 		else:
// 			Show the day
// else:
// 		Show the time
//

/**
 * Returns an array of labels to be used in a chart based on a given sentiment history and time range
 *
 * @param {SentimentHistory[]} history - The array of sentiment data to be used in the chart
 * @param {string} rangeSelected - The selected time range: "day", "week", or "month"
 * @returns {string[]} An array of formatted labels based on the time range and sentiment history
 */
export function getLabels(
	history: SentimentHistory[],
	rangeSelected: string
): string[] {
	// Map the datetime values to labels based on the selected time range
	const labels = history.map((value) => {
		const datetime = value.datetime;
		var formDateTime = "";
		if (datetime.getUTCDate() == 1) {
			// If the datetime is the first day of the month, display the month and day
			formDateTime = datetime.toLocaleString("en", {
				month: "long",
				day: "numeric",
			});
		} else {
			switch (rangeSelected) {
				case "day":
					// If the datetime is within the last 24 hours, display the time (hour and minute)
					formDateTime = datetime.toLocaleString("en", {
						hour: "2-digit",
						minute: "2-digit",
					});
					break;
				case "week":
					// If the datetime is within the last 7 days, display the day and hour
					formDateTime = datetime.toLocaleString("en", {
						day: "2-digit",
						hour: "2-digit",
					});
					break;
				case "month":
					// If the datetime is within the last month, display the day and month abbreviation
					formDateTime = datetime.toLocaleString("en", {
						day: "2-digit",
						month: "short",
					});
					break;
			}
		}

		return formDateTime;
	});
	return labels;
}

/**
 * Returns an array of sub_sentiment values from the given SentimentHistory array
 * @param {SentimentHistory[]} history - Array of SentimentHistory objects
 * @returns {number[]} Array of sub_sentiment values from the given SentimentHistory array
 */
export function getValues(history: SentimentHistory[]): number[] {
	return history.map((value) => value.sub_sentiment);
}

/**
 * Returns a Date object for the selected range and end date/time
 * @param {string} selected - String representing the selected range ("day", "week", or "month")
 * @param {Date} endDateTime - Date object representing the end date/time
 * @returns {Date} A Date object to be used to update the start date time
 */
export function getSelectedDate(selected: string, endDateTime: Date): Date {
	switch (selected) {
		case "day":
			return new Date(
				new Date().setUTCDate(endDateTime.getUTCDate() - 1)
			);
		case "week":
			return new Date(
				new Date().setUTCDate(endDateTime.getUTCDate() - 7)
			);
		case "month":
			return new Date(
				new Date().setUTCMonth(endDateTime.getUTCMonth() - 1)
			);
	}
	// if an invalid range is selected, return the original endDateTime
	return endDateTime;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// Index page function
/**
 * Calculates and returns the market average sentiment value for an array of CryptoData objects.
 * @param cryptoData An array of CryptoData objects.
 * @returns {string} A string representing the market average sentiment value.
 */
export function getMarketAverage(cryptoData: CryptoData[]): string {
	var marketSum: number = 0;
	for (var item of cryptoData) {
		marketSum += parseFloat(item.sentiment);
	}
	const marketSentiment: string = (marketSum / cryptoData.length).toFixed(2);
	return marketSentiment;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// Watchlist page function
/**
 * Filters an array of CryptoData objects to return only those marked as favourite.
 * @param {CryptoData[]} cryptoData An array of CryptoData objects.
 * @returns {CryptoData[]} An array of CryptoData objects that have been marked as favourite.
 */
export function getWatchList(cryptoData: CryptoData[]): CryptoData[] {
	return cryptoData.filter((value) => value.favourite);
}
