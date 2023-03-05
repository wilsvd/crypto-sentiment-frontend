import { Button, Container, Text } from "@nextui-org/react";
import Head from "next/head";

export default function About() {
	return (
		<Container fluid>
			<Head>
				<title>About</title>
				<meta property="og:About" content="About" key="about" />
			</Head>
			<Text h3>About this</Text>
		</Container>
	);
}
