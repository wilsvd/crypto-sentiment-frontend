import Head from "next/head";
import WatchTable from "@/components/cryptodata/CryptoTable";
import { selectCryptoData } from "@/store/cryptoslice";
import { useAppSelector } from "@/store/hooks";
import { getWatchList } from "@/utility/units";
import { Container, Text } from "@nextui-org/react";

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
				<WatchTable
					cryptoData={cryptoData}
					watchlist={getWatchList(cryptoData)}
				></WatchTable>
			</Container>
		</Container>
	);
}
