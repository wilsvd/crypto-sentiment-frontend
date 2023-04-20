// This file is purely to make Unit Testing Easier due to constant problems with imports of other files

import { cryptoDataT } from "@/store/cryptoslice";
import { SentimentHistory } from "./firestore";

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// CryptoGauge functions
//
// range from 0 to 1 on the gauge
// My range is from -1 to 0 to 1
// Map 0 to -1              -1 to 0 (Things need to map to (0 to 0.5))
// Map 0.5 to 0
// Map 1 to 1               0 to 1 (Things need to map to (0.5 to 1))

// Keeping all constants for understanding the mapping
const EXTREME_LEFT_OG = -1;
const EXTREME_RIGHT_OG = 1;
const EXTREME_LEFT_NEW = 0;
const EXTREME_RIGHT_NEW = 1;

export function mapping(oldGauge: number) {
	// SLOPE = (EXTREME_RIGHT_NEW - EXTREME_LEFT_NEW) / (EXTREME_RIGHT_OG - EXTREME_LEFT_OG)
	// EXTREME_LEFT_NEW + (SLOPE) * (oldGauge - EXTREME_LEFT_OG)
	//
	// SLOPE = (1) / (2)
	// 0	+		(0.5)		*		(oldGauge		+		1)
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
export function getLabels(history: SentimentHistory[], rangeSelected: string) {
	const labels = history.map((value) => {
		const datetime = value.datetime;
		var formDateTime = "";
		if (datetime.getUTCDate() == 1) {
			formDateTime = datetime.toLocaleString("en", {
				month: "long",
				day: "numeric",
			});
		} else {
			switch (rangeSelected) {
				case "day":
					formDateTime = datetime.toLocaleString("en", {
						hour: "2-digit",
						minute: "2-digit",
					});
					break;
				case "week":
					formDateTime = datetime.toLocaleString("en", {
						day: "2-digit",
						hour: "2-digit",
					});
					break;
				case "month":
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

export function getValues(history: SentimentHistory[]) {
	return history.map((value) => value.sub_sentiment);
}

export function getSelectedDate(selected: string, endDateTime: Date) {
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
	return endDateTime;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// Index page function
//
export function getMarketAverage(cryptoData: cryptoDataT[]): string {
	var marketSum: number = 0;
	for (var item of cryptoData) {
		marketSum += parseFloat(item.sentiment);
	}
	const marketSentiment: string = (marketSum / cryptoData.length).toFixed(2);
	return marketSentiment;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// Watchlist page function
//
export function getWatchList(cryptoData: cryptoDataT[]): cryptoDataT[] {
	return cryptoData.filter((value) => value.favourite);
}
