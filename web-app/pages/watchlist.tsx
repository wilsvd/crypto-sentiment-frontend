import Head from "next/head";
import WatchTable from "@/components/cryptodata/CryptoTable";
import { selectCryptoData } from "@/store/cryptoslice";
import { useAppSelector } from "@/store/hooks";
import { getWatchList } from "@/utility/units";
import { Container, Text } from "@nextui-org/react";

/**
 * React component that displays the watchlist page, which contains a table of crypto data
 *
 * @returns {JSX.Element}
 */
export default function Watchlist(): JSX.Element {
	// Retrieves the crypto data from the store using a selector
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
				{/* Renders the CryptoTable component with the filtered watchlist data */}
				<WatchTable
					cryptoData={cryptoData}
					watchlist={getWatchList(cryptoData)}
				></WatchTable>
			</Container>
		</Container>
	);
}
