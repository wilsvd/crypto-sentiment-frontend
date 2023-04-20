import { describe, expect, it } from "vitest";
import { cryptoDataT } from "@/store/cryptoslice";
import {
	getMarketAverage,
	getSelectedDate,
	getValues,
	getWatchList,
} from "@/utility/units";
import { getLabels } from "@/utility/units";
import { SentimentHistory } from "@/utility/firestore";

const inputData: cryptoDataT[] = [
	{
		key: "Bitcoin",
		cryptocurrency: "Bitcoin",
		sentiment: "-1.0",
		favourite: true,
	},
	{
		key: "Ethereum",
		cryptocurrency: "Ethereum",
		sentiment: "0.0",
		favourite: false,
	},
	{
		key: "Aave",
		cryptocurrency: "Aave",
		sentiment: "1.0",
		favourite: true,
	},
];

const outputData: cryptoDataT[] = [
	{
		key: "Bitcoin",
		cryptocurrency: "Bitcoin",
		sentiment: "-1.0",
		favourite: true,
	},
	{
		key: "Aave",
		cryptocurrency: "Aave",
		sentiment: "1.0",
		favourite: true,
	},
];

const date = new Date("2012-12-12T14:48:00.000Z");
const dateArray: Date[] = [];
for (let i = 0; i < 6; i++) {
	const tmpDate = new Date(date);
	const newDate = tmpDate.getUTCDate() - i;
	tmpDate.setUTCDate(newDate);
	dateArray.push(tmpDate);
}

const historicalData: SentimentHistory[] = [
	{
		datetime: dateArray[0],
		sub_sentiment: 1.0,
	},
	{
		datetime: dateArray[1],
		sub_sentiment: 0.0,
	},
	{
		datetime: dateArray[2],
		sub_sentiment: -1.0,
	},
	{
		datetime: dateArray[3],
		sub_sentiment: 1.0,
	},
	{
		datetime: dateArray[4],
		sub_sentiment: 0.0,
	},
	{
		datetime: dateArray[5],
		sub_sentiment: -1.0,
	},
];

describe("tests using crypto data collected", () => {
	it("should get the market average", () => {
		const result = getMarketAverage(inputData);

		expect(parseFloat(result)).toBe(0);
	});

	it("should get the watchlist from cryptodata", () => {
		const result = getWatchList(inputData);
		expect(result).toStrictEqual(outputData);
	});

	it("should get the labels for days", () => {
		const result = getLabels(historicalData, "day");
		// Should return result of users timezone
		const days: string[] = [];
		for (var date of dateArray) {
			days.push(
				date.toLocaleString("en", {
					hour: "2-digit",
					minute: "2-digit",
				})
			);
		}
		expect(result).toStrictEqual(days);
	});
	it("should get the labels for weeks", () => {
		const result = getLabels(historicalData, "week");
		// Should return result of users timezone
		const weeks: string[] = [];
		for (var date of dateArray) {
			weeks.push(
				date.toLocaleString("en", {
					day: "2-digit",
					hour: "2-digit",
				})
			);
		}
		expect(result).toStrictEqual(weeks);
	});
	it("should get the labels for months", () => {
		const result = getLabels(historicalData, "month");
		// Should return result of users timezone
		const months: string[] = [];
		for (var date of dateArray) {
			months.push(
				date.toLocaleString("en", {
					day: "2-digit",
					month: "short",
				})
			);
		}
		expect(result).toStrictEqual(months);
	});

	it("should get the values for historical date", () => {
		const result = getValues(historicalData);
		// Should return result of users timezone
		const sentiments: number[] = [1, 0, -1, 1, 0, -1];
		expect(result).toStrictEqual(sentiments);
	});

	it("should get the selected date for day", () => {
		const result = getSelectedDate("day", date);
		const expecDate = new Date(
			new Date().setUTCDate(date.getUTCDate() - 1)
		);
		// Should return result of users timezone
		expect(result).toStrictEqual(expecDate);
	});
	it("should get the selected date for week", () => {
		const result = getSelectedDate("week", date);
		const expecDate = new Date(
			new Date().setUTCDate(date.getUTCDate() - 7)
		);
		// Should return result of users timezone
		expect(result).toStrictEqual(expecDate);
	});
	it("should get the selected date for month", () => {
		const result = getSelectedDate("month", date);
		const expecDate = new Date(
			new Date().setUTCMonth(date.getUTCMonth() - 1)
		);
		// Should return result of users timezone
		expect(result).toStrictEqual(expecDate);
	});
});
