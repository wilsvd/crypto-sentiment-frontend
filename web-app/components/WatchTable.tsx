import { Button, Container, Table } from "@nextui-org/react";
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Badge from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
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

	// const email = useSelector(selectEmail);
	// const isActive = useSelector(selectisActive);

	// function addNewUser(email: string) {
	// 	const usersRef = doc(firedb, "users", email);
	// 	setDoc(usersRef, { favourites: [] });
	// 	console.log("New user added");
	// }

	// React.useEffect(() => {
	// 	async function getItems() {
	// 		if (email) {
	// 			const docRef = doc(firedb, `users/${email}`);

	// 			const docSnap = await getDoc(docRef);
	// 			if (docSnap.exists()) {
	// 				const userData = docSnap.data();
	// 				const userFavourites: [] = userData["favourites"];

	// 				const newData = userFavourites.map(async (crypto) => {
	// 					const q = query(
	// 						collection(firedb, `sentiments/${crypto}/history`),
	// 						orderBy("datetime", "desc"),
	// 						limit(1)
	// 					);
	// 					console.log(q);
	// 					var newData = {
	// 						key: "",
	// 						cryptocurrency: "",
	// 						sentiment: "0.0",
	// 					};
	// 					const querySnapshot = await getDocs(q);
	// 					querySnapshot.forEach((doc) => {
	// 						const cryptoInfo = doc.data();
	// 						const num_sentiment: number =
	// 							cryptoInfo["sub_sentiment"];
	// 						const sub_sentiment = num_sentiment.toFixed(2);

	// 						newData = {
	// 							key: crypto,
	// 							cryptocurrency: crypto,
	// 							sentiment: sub_sentiment,
	// 						};
	// 					});

	// 					return newData;
	// 				});
	// 				Promise.all(newData).then((values) => {
	// 					setCryptoData(values);
	// 					setLoading(true);
	// 					console.log("Final data: " + cryptoData);
	// 				});
	// 			} else {
	// 				addNewUser(email);
	// 				console.log("Doesn't exist");
	// 			}
	// 		} else {
	// 			setCryptoData({} as Rows);
	// 		}
	// 	}
	// 	getItems();
	// }, []);

	// Temporary data to experiment with using table component

	const renderCell = (item: Row, columnKey: React.Key) => {
		const cellValue = item[columnKey];
		switch (columnKey) {
			case "favourite":
				return (
					<Image
						src="/iconmonstr-heart-thin.svg"
						alt="me"
						width="32"
						height="32"
						color="red"
					/>
				);
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

	function handleDisplayLogic(): ReactNode {
		if (cryptoData.length > 0) {
			if (loading) {
				return renderTable(cryptoData);
			} else {
				return <p>Loading</p>;
			}
		} else if (!false /*isActive*/) {
			return (
				<p>You must have an account to be able to keep a watchlist</p>
			);
		} else {
			return (
				<p>You have not added any cryptocurrencies to your watchlist</p>
			);
		}
	}
	return <Container>{handleDisplayLogic()}</Container>;
}
