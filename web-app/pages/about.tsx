import { Button, Container, Text } from "@nextui-org/react";
import Head from "next/head";

export default function About() {
	return (
		<Container fluid aria-labelledby="about-container">
			<Head aria-labelledby="about-metadata">
				<title>About</title>
				<meta property="og:About" content="About" key="about" />
			</Head>
			<Container css={{ padding: "10px" }}>
				<Text h3>About</Text>
			</Container>
		</Container>
	);
}
