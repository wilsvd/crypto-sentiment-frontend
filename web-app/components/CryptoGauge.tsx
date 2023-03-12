import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { LatestSentiment } from "@/utility/firestore";
import { Container } from "@nextui-org/react";

type Props = {
	crypto: LatestSentiment;
};

const EXTREME_LEFT_OG = -1;
const EXTREME_RIGHT_OG = 1;
const EXTREME_LEFT_NEW = 0;
const EXTREME_RIGHT_NEW = 1;

export default function CryptoGauge({ crypto }: Props) {
	// range from 0 to 1 on the gauge
	// My range is from -1 to 0 to 1
	// Map 0 to -1              -1 to 0 (Things need to map to (0 to 0.5))
	// Map 0.5 to 0
	// Map 1 to 1               0 to 1 (Things need to map to (0.5 to 1))

	// (-1 - -1) * ((1 - 0) / (1 - -1)) + 0;

	function mapping(oldGauge: number) {
		// newGauge = EXTREME_LEFT_NEW + ((EXTREME_RIGHT_NEW - EXTREME_LEFT_NEW) / (EXTREME_RIGHT_OG - EXTREME_LEFT_OG)) * (oldGauge - EXTREME_LEFT_OG)
		// Division is a slow operation
		const slope = 1; // => (1 / 2) => Can use a bit shift to speed up.
		const newGauge = (((oldGauge - EXTREME_LEFT_OG) * 100) >> slope) * 0.01; // => 0 + (1/2) * (oldGauge - -1) =>
		return newGauge;
	}

	const [gauge, setGauge] = useState<number>(crypto.latestSentiment);

	return (
		<GaugeChart
			nrOfLevels={100}
			arcPadding={0}
			cornerRadius={0}
			animDelay={100}
			hideText={true}
			textColor="#000"
			colors={["#FF0000", "#00FF00"]}
			formatTextValue={(value) => value}
			percent={mapping(gauge)}
		/>
	);
}
