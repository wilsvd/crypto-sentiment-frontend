import DefaultTable from "@/components/DefaultTable";
import WatchTable from "@/components/WatchTable";
import { selectCryptoData } from "@/store/cryptoslice";
import { useAppSelector } from "@/store/hooks";
import { Container, Text } from "@nextui-org/react";
import Head from "next/head";

Text;
export default function Watchlist() {
	const cryptoData = useAppSelector(selectCryptoData);
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
			<Container css={{ padding: "10px" }}>
				<Text h3>Watchlist</Text>
				<WatchTable cryptoData={cryptoData}></WatchTable>
			</Container>
		</Container>
	);
}
