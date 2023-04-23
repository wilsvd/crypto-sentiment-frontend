import Head from "next/head";
import React from "react";

import { Container, Spacer, Text } from "@nextui-org/react";
import { selectCryptoData } from "@/store/cryptoslice";
import { useAppSelector } from "@/store/hooks";
import DashboardTable from "@/components/cryptodata/CryptoTable";
import { getMarketAverage } from "@/utility/units";

/**
 * The default home page component that displays the sentiment of the cryptocurrency market
 * and a table of cryptocurrency data.
 * @returns {JSX.Element} The home page component with market sentiment and cryptocurrency data table.
 */
export default function Home(): JSX.Element {
	// Select crypto data from the global Redux store
	const cryptoData = useAppSelector(selectCryptoData);

	// Set heading and subheading text
	const heading = "Today's Cryptocurrency Sentiment";
	const subheading = `The global crypto market sentiment is ${getMarketAverage(
		cryptoData
	)}`;
	return (
		<Container fluid>
			<Head>
				<title>Dashboard</title>
				<meta
					property="og:dashboard"
					content="Dashboard"
					key="dashboard"
				/>
			</Head>
			<Container css={{ padding: "10px" }}>
				<Text h3>{heading}</Text>
				<Text size={"$lg"} color={"#4E4E4E"}>
					{subheading}
				</Text>
				<Spacer y={1}></Spacer>
				<DashboardTable
					cryptoData={cryptoData}
					watchlist={null}
				></DashboardTable>
			</Container>
		</Container>
	);
}
