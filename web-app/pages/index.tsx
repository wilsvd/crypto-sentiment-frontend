import Head from "next/head";

import React, { useEffect, useState } from "react";

import { Button, Container, Text } from "@nextui-org/react";
import DefaultTable from "@/components/DefaultTable";

export default function Home() {
	const text = "Today's Cryptocurrency Sentiment";
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
				<Text h3>{text}</Text>
				<DefaultTable></DefaultTable>
			</Container>
		</Container>
	);
}
