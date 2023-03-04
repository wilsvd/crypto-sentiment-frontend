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

export default function DefaultTable() {
	type Col = {
		[key: string]: string;
		label: string;
	};

	type Cols = Col[];

	const columns: Cols = [
		{
			key: "favourite",
			label: "Favourite",
		},
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
		[key: string]: any;
		favourite: boolean;
		cryptocurrency: string;
		sentiment: string;
	};
	type Rows = Row[];

	const [loading, setLoading] = React.useState(false);
	const [cryptoData, setCryptoData] = React.useState<Rows>([]);

	const [favourites, setFavourites] = React.useState<string[]>([]);

	React.useEffect(() => {
		// async function getFavourites() {
		// 	if (isActive) {
		// 		const docRef = doc(firedb, `users/${email}`);

		// 		const docSnap = await getDoc(docRef).then((docSnap) => {
		// 			if (docSnap.exists()) {
		// 				const userData = docSnap.data();
		// 				const userFavourites: [] = userData["favourites"];
		// 				setFavourites([...userFavourites]);
		// 			}
		// 		});
		// 	} else {
		// 		console.log("Account not logged in cannot retrieve favourites");
		// 	}
		// }

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
							const isFavourite = favourites.includes(crypto);

							return {
								key: crypto,
								cryptocurrency: crypto,
								sentiment: sub_sentiment,
								favourite: isFavourite,
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

		// getFavourites();
		getItems();
	}, []);

	// Temporary data to experiment with using table component

	const renderCell = (item: Row, columnKey: React.Key) => {
		const cellValue = item[columnKey];
		switch (columnKey) {
			case "favourite":
				if (cellValue) {
					return (
						<Image
							src="/red-heart-icon.svg"
							alt="me"
							width="32"
							height="32"
						/>
					);
				} else {
					return (
						<Image
							src="/iconmonstr-heart-thin.svg"
							alt="me"
							width="32"
							height="32"
						/>
					);
				}

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
			{loading ? renderTable(cryptoData) : <p>Loading</p>}
		</Container>
	);
}
