import DefaultTable from "@/components/DefaultTable";
import { Container, Text } from "@nextui-org/react";

Text;
export default function Watchlist() {
	return (
		<Container fluid>
			<Text
				h3
				css={{
					padding: "10px 0px 20px 10px",
				}}
			>
				Watchlist
			</Text>
			<DefaultTable />
		</Container>
	);
}
