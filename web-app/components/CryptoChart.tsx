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
	Point,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
	getSentimentHistoryInRange,
	LatestSentiment,
} from "@/utility/firestore";
import { Container } from "@nextui-org/react";

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

	const [startTime, setStartTime] = useState(
		new Date("2023-01-01T00:00:00Z")
	);
	const [endTime, setEndTime] = useState(new Date());

	const [history, setHistory] = useState<
		{ datetime: string; sub_sentiment: number }[] | null
	>(null);

	const [data, setData] = useState<ChartData<"line">>();
	const [options, setOptions] = useState<ChartOptions<"line">>({
		responsive: true,
		maintainAspectRatio: true,

		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Chart.js Line Chart",
			},
		},
	});

	useEffect(() => {
		async function getNewHistory() {
			getSentimentHistoryInRange(crypto.id, startTime, endTime).then(
				(history) => {
					console.log(history);
					setHistory(history);
					setData({
						labels: history.map((value) => value.datetime),
						datasets: [
							{
								label: `${crypto.id}`,
								data: history.map(
									(value) => value.sub_sentiment
								),
								borderColor: "rgb(255, 99, 132)",
								backgroundColor: "rgba(255, 99, 132, 0.5)",
							},
						],
					});
				}
			);
		}
		getNewHistory();
	}, [startTime, endTime]);
	return (
		<div>
			<select
				onChange={(e) => {
					console.log(e.target.value);
					const dateOffset = parseInt(e.target.value);

					setStartTime(
						new Date(
							new Date().setUTCDate(
								endTime.getUTCDate() - dateOffset
							)
						)
					);
				}}
			>
				<option value={30}>30 days</option>
				<option value={7}>7 days</option>
				<option value={1}>1 day</option>
			</select>

			<Container fluid>
				{data ? <Line options={options} data={data} /> : null}
			</Container>
		</div>
	);
};

export default CryptoChart;
// export default dynamic(() => Promise.resolve(CryptoChart), { ssr: false });