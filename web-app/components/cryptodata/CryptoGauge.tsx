import { mapping } from "@/utility/units";
import React from "react";
import GaugeChart from "react-gauge-chart";

export type GaugeData = {
	id: string;
	latestSentiment: number;
};

type Props = {
	crypto: GaugeData;
	style: React.CSSProperties;
};

export default function CryptoGauge({ crypto, style }: Props) {
	return (
		<GaugeChart
			style={style}
			nrOfLevels={100}
			arcPadding={0}
			cornerRadius={0}
			animDelay={100}
			hideText={true}
			animate={false}
			textColor="#000"
			colors={["#FF0000", "#00FF00"]}
			formatTextValue={(value) => value}
			percent={mapping(crypto.latestSentiment)}
		/>
	);
}
