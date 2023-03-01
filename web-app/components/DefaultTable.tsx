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

	const [loading, setLoading] = React.useState(false);
	const [cryptoData, setCryptoData] = React.useState<Rows>([]);

	React.useEffect(() => {
		async function getItems() {
			const resultData = await getDocs(
				collection(firedb, `sentiments`)
			).then((querySnapshot) => {
				const newData = querySnapshot.docs.map(async (doc) => {
					const crypto: string = doc.id;
					const q = query(
						collection(firedb, `sentiments/${crypto}/history`),
						orderBy("datetime", "desc"),
						limit(1)
					);
					const docResult = await getDocs(q).then(
						(inQuerySnapshot) => {
							const info = inQuerySnapshot.docs[0].data();
							const num_sentiment: number = info["sub_sentiment"];
							const sub_sentiment = num_sentiment.toFixed(2);
							return {
								key: crypto,
								cryptocurrency: crypto,
								sentiment: sub_sentiment,
							};
						}
					);
					return docResult;
				});
				Promise.all(newData).then((values) => {
					setCryptoData(values);
					setLoading(true);
				});
			});
		}
		getItems();
	}, []);

	function updatetable() {
		async function getItems() {
			const resultData = await getDocs(
				collection(firedb, `sentiments`)
			).then((querySnapshot) => {
				const newData = querySnapshot.docs.map(async (doc) => {
					const crypto: string = doc.id;
					const q = query(
						collection(firedb, `sentiments/${crypto}/history`),
						orderBy("datetime", "desc"),
						limit(1)
					);
					const docResult = await getDocs(q).then(
						(inQuerySnapshot) => {
							const info = inQuerySnapshot.docs[0].data();
							const num_sentiment: number = info["sub_sentiment"];
							const sub_sentiment = num_sentiment.toFixed(2);
							return {
								key: crypto,
								cryptocurrency: crypto,
								sentiment: sub_sentiment,
							};
						}
					);
					return docResult;
				});
				Promise.all(newData).then((values) => {
					setCryptoData(values);
					setLoading(true);
				});
			});
		}
		getItems();
	}
	console.log(cryptoData);
	// Temporary data to experiment with using table component

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

	const renderTable = (liveData: Rows) => {
		console.log(liveData);
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
						<Table.Column key={column.key}>
							{column.label}
						</Table.Column>
					)}
				</Table.Header>
				<Table.Body items={liveData}>
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
		);
	};

	return (
		<Container>
			<Button onPress={updatetable}>Update data</Button>

			{loading ? renderTable(cryptoData) : <p>Loading</p>}
		</Container>
	);
}
