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

export default function CryptoGauge({ crypto, style }: Props) {
	// range from 0 to 1 on the gauge
	// My range is from -1 to 0 to 1
	// Map 0 to -1              -1 to 0 (Things need to map to (0 to 0.5))
	// Map 0.5 to 0
	// Map 1 to 1               0 to 1 (Things need to map to (0.5 to 1))

	// (-1 - -1) * ((1 - 0) / (1 - -1)) + 0;
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
