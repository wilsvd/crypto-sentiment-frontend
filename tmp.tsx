import { Table } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Badge from "@nextui-org/react";
import { getLatestCryptoHistory } from "@/utility/firestore_helper";

export default function DefaultTable() {
	type Col = {
		[key: string]: string;
		label: string;
	};

	type Cols = Col[];

	const columns: Cols = [
		{
			key: "cryptocurrency",
			label: "Cryptocurrency",
		},
		{
			key: "sentiment",
			label: "Sentiment",
		},
	];

	type Row = {
		[key: string]: string;
		cryptocurrency: string;
		sentiment: string;
	};
	type Rows = Row[];

	const [todos, settodos] = React.useState<object[]>([]);

	React.useEffect(() => {
		const fetchData = async () => {
			const data: object[] = await getLatestCryptoHistory();
			settodos(data);
		};
		fetchData().catch(console.error);
	}, []);
	let table: Rows;

	table = todos.map((crypto: Object) => {
		let crypto_name: string = Object.keys(crypto)[0];
		let sentiment_val =
			crypto[crypto_name as keyof Object][
				"sub_sentiment" as keyof Object
			];
		return {
			key: crypto_name,
			cryptocurrency: crypto_name,
			sentiment: sentiment_val.toString(),
		};
	});
	console.log(todos);
	// Temporary data to experiment with using table component

	const rows: Rows = table;

	const renderCell = (item: Row, columnKey: React.Key) => {
		const cellValue = item[columnKey];
		console.log(cellValue);

		switch (columnKey) {
			case "cryptocurrency":
				return (
					<Link
						style={{ textDecoration: "underline" }}
						href={`/${cellValue}`}
					>
						{cellValue}
					</Link>
				);
			default:
				return cellValue;
		}
	};
	return (
		<Table
			aria-label="Example table with dynamic content"
			shadow={false}
			css={{
				height: "auto",
				minWidth: "100%",
				padding: "10px",
				// zIndex: "0",
			}}
		>
			<Table.Header columns={columns}>
				{(column) => (
					<Table.Column key={column.key}>{column.label}</Table.Column>
				)}
			</Table.Header>
			<Table.Body items={rows}>
				{(item) => (
					<Table.Row key={item.key}>
						{(columnKey) => (
							<Table.Cell>
								<h1>Testing</h1>
								{/* {renderCell(item, columnKey)} */}
							</Table.Cell>
						)}
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	);
}
