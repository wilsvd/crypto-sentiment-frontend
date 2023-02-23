import { Table } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

export default function DefaultTable() {
	const [todos, settodos] = React.useState({});

	React.useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/tryFirebaseadmin");
			const data = await response.json();
			settodos(data["data"]);
		};
		fetchData().catch(console.error);
	}, []);

	let table;

	let cryptocurrencies = Object.keys(todos);

	table = cryptocurrencies.map((crypto) => {
		var sentimentVal: string = todos[crypto]["sentiment"];
		return {
			key: crypto,
			cryptocurrency: crypto,
			sentiment: sentimentVal,
		};
	});

	// Temporary data to experiment with using table component
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

	const rows: Rows = table;

	return (
		<Table
			aria-label="Example table with dynamic content"
			shadow={false}
			css={{
				height: "auto",
				minWidth: "100%",
				padding: "10px",
				zIndex: "0",
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
								{columnKey == "cryptocurrency" ? (
									<Link
										style={{ textDecoration: "underline" }}
										href={`/${item[columnKey]}`}
									>
										{item[columnKey]}
									</Link>
								) : (
									item[columnKey]
								)}
							</Table.Cell>
						)}
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	);
}
