import DefaultTable from "@/components/DefaultTable";
import WatchTable from "@/components/WatchTable";
import { Container, Text } from "@nextui-org/react";
import Head from "next/head";

Text;
export default function Watchlist() {
	return (
		<Container fluid>
			<Head>
				<title>Watchlist</title>
				<meta
					property="og:Watchlist"
					content="Watchlist"
					key="watchlist"
				/>
			</Head>
			<Text h3>Watchlist</Text>
			<WatchTable></WatchTable>
		</Container>
	);
}
