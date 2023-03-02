import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import React from "react";

import { Button, Container, Text } from "@nextui-org/react";
import DefaultTable from "@/components/DefaultTable";

// import { db } from "@/config/firebase";

export default function Home() {
	const text = "Today's Cryptocurrency Sentiment";

	return (
		<Container fluid>
			<Text h3>{text}</Text>

			<DefaultTable></DefaultTable>
		</Container>
	);
}
