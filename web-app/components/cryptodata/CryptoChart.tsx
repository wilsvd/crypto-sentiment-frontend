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
	SentimentHistory,
} from "@/utility/firestore";
import { getLabels, getSelectedDate, getValues } from "@/utility/units";

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

	useEffect(() => {
		async function getNewHistory() {
			getSentimentHistoryInRange(
				crypto.id,
				startDateTime,
				endDateTime
			).then((history) => {
				setData({
					labels: getLabels(history, rangeSelected),
					datasets: [
						{
							label: `${crypto.id}`,
							data: getValues(history),
							borderColor: "rgb(255, 99, 132)",
							backgroundColor: "rgba(255, 99, 132, 0.5)",
						},
					],
				});
			});
		}
		getNewHistory();
	}, [rangeSelected, crypto.id]);

	console.log(rangeSelected);

	return (
		<>
			<select
				aria-labelledby="drop-down-historical-range"
				data-testid="crypto-chart-selector"
				style={{ float: "right" }}
				onChange={(e) => {
					const selected = e.target.value;
					setRangeSelected(selected);

					const resultDate = getSelectedDate(selected, endDateTime);

					setStartDateTime(resultDate);
				}}
			>
				<option value={"month"} data-testid="crypto-chart-value-month">
					1 Month
				</option>
				<option value={"week"} data-testid="crypto-chart-value-week">
					7 Days
				</option>
				<option value={"day"} data-testid="crypto-chart-value-day">
					1 Day
				</option>
			</select>
			{data ? <Line options={options} data={data} /> : null}
		</>
	);
};

export default CryptoChart;
