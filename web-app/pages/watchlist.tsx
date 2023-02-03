import DefaultTable from "@/components/DefaultTable";
import { Text } from "@nextui-org/react";

Text;
export default function Watchlist() {
	return (
		<div>
			<Text
				h3
				css={{
					padding: "10px 0px 20px 10px",
				}}
			>
				Watchlist
			</Text>
			<DefaultTable />
		</div>
	);
}
