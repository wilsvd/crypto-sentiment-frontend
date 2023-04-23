import { mapping } from "@/utility/units";
import React from "react";
import GaugeChart from "react-gauge-chart";

/**
 * Data used to render a gauge chart for a cryptocurrency.
 *
 * @typedef {Object} GaugeData - A new type named 'GaugeData'.
 * @property {string} id - The ID of the cryptocurrency.
 * @property {number} latestSentiment - The latest sentiment score for the cryptocurrency.
 */
export type GaugeData = {
	id: string;
	latestSentiment: number;
};

/**
 * Props for the CryptoGauge component.
 *
 * @typedef {Object} GaugeProps - A new type named 'GaugeProps'
 * @property {GaugeData} crypto - The data for the cryptocurrency to render.
 * @property {React.CSSProperties} style - Custom styles to apply to the component.
 */
type GaugeProps = {
	crypto: GaugeData;
	style: React.CSSProperties;
};

/**
 * A component that displays a gauge chart for a cryptocurrency.
 *
 * @param {GaugeProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export default function CryptoGauge({
	crypto,
	style,
}: GaugeProps): JSX.Element {
	// Render a GaugeChart component with the given props.
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
