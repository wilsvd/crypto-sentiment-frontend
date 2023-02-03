import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import React from "react";

import { Pagination } from "@nextui-org/react";

import { Text } from "@nextui-org/react";

export default function Home() {
	const text = "Today's Cryptocurrency Sentiment";
	return (
		<div>
			<Text h3>{text}</Text>
		</div>
	);
}
