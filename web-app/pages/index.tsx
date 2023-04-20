import Head from "next/head";
import React from "react";

import { Container, Spacer, Text } from "@nextui-org/react";
import { selectCryptoData } from "@/store/cryptoslice";
import { useAppSelector } from "@/store/hooks";
import DashboardTable from "@/components/cryptodata/CryptoTable";
import { getMarketAverage } from "@/utility/units";

export default function Home() {
	const cryptoData = useAppSelector(selectCryptoData);

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
