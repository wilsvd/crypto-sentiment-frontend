import { Button, Container, Table } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Badge from "@nextui-org/react";
// import { getLatestCryptoHistory } from "@/utility/firestore_helper";
import { firedb } from "@/config/firebase";
import {
	collection,
	doc,
	getDoc,
	setDoc,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	DocumentData,
} from "firebase/firestore";
import ReactDOM from "react-dom";

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

	const [cryptoData, setCryptoData] = React.useState<Rows>([]);
	// const [tableData, setTableData] = React.useState<object[]>([]);
	React.useEffect(() => {}, []);

	function updatetable() {
		async function getItems() {
			const q = query(collection(firedb, `sentiments`));
			const querySnapshot = await getDocs(q);
			var cryptoInfo: Rows = [];
			querySnapshot.forEach(async (doc) => {
				// Getting the history of that cryptocurrency

				const crypto = doc.id;
				const q = query(
					collection(firedb, `sentiments/${crypto}/history`),
					orderBy("datetime", "desc"),
					limit(1)
				);

				getDocs(q).then((inQuerySnapshot) => {
					const info = inQuerySnapshot.docs[0].data();
					const num_sentiment: number = info["sub_sentiment"];
					const sub_sentiment = num_sentiment.toFixed(2);
					// const docRes = { [crypto]: info };
					cryptoInfo.push({
						key: crypto,
						cryptocurrency: crypto,
						sentiment: sub_sentiment,
					});
				});
			});
			return cryptoInfo;
		}
		getItems().then((data) => {
			setCryptoData(data);
		});
	}
	// console.log(cryptoData);
	// Temporary data to experiment with using table component

	const rows: Rows = cryptoData;

	const renderCell = (item: Row, columnKey: React.Key) => {
		const cellValue = item[columnKey];
		switch (columnKey) {
			// case "favourite":
			// 	return (
			// 		<Image
			// 			src="/iconmonstr-heart-thin.svg"
			// 			alt="me"
			// 			width="32"
			// 			height="32"
			// 			color="red"
			// 		/>
			// 	);
			case "cryptocurrency":
				console.log(cellValue);
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
		<Container>
			<Button onClick={updatetable}>Update data</Button>
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
						<Table.Column key={column.key}>
							{column.label}
						</Table.Column>
					)}
				</Table.Header>
				<Table.Body items={rows}>
					{(item) => (
						<Table.Row key={item.key}>
							{(columnKey) => (
								<Table.Cell>
									{renderCell(item, columnKey)}
								</Table.Cell>
							)}
						</Table.Row>
					)}
				</Table.Body>
			</Table>
		</Container>
	);
}
