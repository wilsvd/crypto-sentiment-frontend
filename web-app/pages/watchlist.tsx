import DefaultTable from "@/components/DefaultTable";
import WatchTable from "@/components/WatchTable";
import { Container, Text } from "@nextui-org/react";

Text;
export default function Watchlist() {
	return (
		<Container fluid>
			<Text h3>Watchlist</Text>
			<WatchTable></WatchTable>
		</Container>
	);
}
