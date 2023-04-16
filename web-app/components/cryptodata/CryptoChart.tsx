import React, { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
	getSentimentHistoryInRange,
	LatestSentiment,
} from "@/utility/firestore";

type Props = {
	crypto: LatestSentiment;
};

const CryptoChart = ({ crypto }: Props) => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const [startDateTime, setStartDateTime] = useState(
		new Date("2023-01-01T00:00:00Z")
	);
	const [endDateTime, setEndDateTime] = useState(new Date());

	const [rangeSelected, setRangeSelected] = useState<string>("month");

	const [data, setData] = useState<ChartData<"line">>();
	const options: ChartOptions<"line"> = {
		responsive: true,
		scales: {
			y: {
				min: -1,
				max: 1,
			},
		},
	};

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

	useEffect(() => {
		async function getNewHistory() {
			getSentimentHistoryInRange(
				crypto.id,
				startDateTime,
				endDateTime
			).then((history) => {
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

							default:
								formDateTime = datetime.toLocaleString("en", {
									day: "2-digit",
								});
								break;
						}
					}

					return formDateTime;
				});

				setData({
					labels: labels,
					datasets: [
						{
							label: `${crypto.id}`,
							data: history.map((value) => value.sub_sentiment),
							borderColor: "rgb(255, 99, 132)",
							backgroundColor: "rgba(255, 99, 132, 0.5)",
						},
					],
				});
			});
		}
		getNewHistory();
	}, [rangeSelected, crypto.id]);

	return (
		<>
			<select
				style={{ float: "right" }}
				onChange={(e) => {
					const selected = e.target.value;
					setRangeSelected(selected);
					var resultDate: Date = startDateTime;
					switch (selected) {
						case "day":
							resultDate = new Date(
								new Date().setUTCDate(
									endDateTime.getUTCDate() - 1
								)
							);
							break;
						case "week":
							resultDate = new Date(
								new Date().setUTCDate(
									endDateTime.getUTCDate() - 7
								)
							);
							break;
						case "month":
							resultDate = new Date(
								new Date().setUTCMonth(
									endDateTime.getUTCMonth() - 1
								)
							);
							break;
						default:
							break;
					}

					setStartDateTime(resultDate);
				}}
			>
				<option value={"month"}>1 Month</option>
				<option value={"week"}>7 Days</option>
				<option value={"day"}>1 Day</option>
			</select>
			{data ? <Line options={options} data={data} /> : null}
		</>
	);
};

export default CryptoChart;
