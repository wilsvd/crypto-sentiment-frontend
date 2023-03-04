import Head from "next/head";

import React from "react";

import { Button, Container, Text } from "@nextui-org/react";
import DefaultTable from "@/components/DefaultTable";
import { selectUser } from "@/store/authslice";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
	const user = useAppSelector(selectUser);
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
			<Text h3>{text}</Text>

			{/* <DefaultTable></DefaultTable> */}
		</Container>
	);
}
