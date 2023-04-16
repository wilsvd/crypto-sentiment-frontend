import WatchTable from "@/components/cryptodata/CryptoTable";
import { selectCryptoData } from "@/store/cryptoslice";
import { useAppSelector } from "@/store/hooks";
import { Container, Text } from "@nextui-org/react";
import Head from "next/head";

export default function Watchlist() {
	const cryptoData = useAppSelector(selectCryptoData);

	function getWatchList() {
		return cryptoData.filter((value) => value.favourite);
	}
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
				<WatchTable
					cryptoData={cryptoData}
					watchlist={getWatchList()}
				></WatchTable>
			</Container>
		</Container>
	);
}
