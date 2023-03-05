import { Button, Container, Table } from "@nextui-org/react";
import React, { ReactNode, useEffect, useRef, useState } from "react";
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
import { Cols, columns, Row, Rows } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/authslice";
import {
	addFavouriteCryptocurrency,
	getFavouriteCryptocurrencies,
	getFavouriteLatestSentiments,
	removeFavouriteCryptocurrency,
} from "@/utility/firestore";

export default function DefaultTable() {
	const user = useAppSelector(selectUser);

	const [loading, setLoading] = React.useState(false);
	const [cryptoData, setCryptoData] = React.useState<Rows>([]);

	const [favourites, setFavourites] = React.useState<string[]>([]);
	const [favouritesLoaded, setFavouritesLoaded] = useState(false);

	const prevFavouritesRef = useRef<string[]>([]);
	useEffect(() => {
		async function getFavourites() {
			if (user && user.email) {
				const userFavourites = await getFavouriteCryptocurrencies(
					user.email
				);
				console.log(userFavourites);
				setFavourites(userFavourites);
				setFavouritesLoaded(true);
			} else {
				console.log(
					"Account not logged in, cannot retrieve favourites"
				);
				setFavourites([]);
				setFavouritesLoaded(true);
			}
		}
		getFavourites();
	}, [user]);

	useEffect(() => {
		if (!favouritesLoaded) return;
		if (prevFavouritesRef.current === favourites) return;
		prevFavouritesRef.current = favourites;

		async function getItems() {
			const favouriteSentiments = await getFavouriteLatestSentiments(
				favourites
			);
			const newData = favouriteSentiments.map((crypto) => {
				const num_sentiment: number = crypto.latestSentiment;
				const sub_sentiment = num_sentiment.toFixed(2);
				return {
					key: crypto.id,
					cryptocurrency: crypto.id,
					sentiment: sub_sentiment,
					favourite: true,
				};
			});

			Promise.all(newData).then((values) => {
				setCryptoData(values);
				setLoading(true);
			});
		}

		getItems();
	}, [favouritesLoaded, favourites]);

	// Temporary data to experiment with using table component

	const toggleFavorite = (crypto: string) => {
		if (!user || !user.email) {
			console.log("You are not logged in");
			return;
		}

		const isFavorited = favourites.includes(crypto);

		const updateFavoritedCrypto = () => {
			setCryptoData((prevCryptoData) =>
				prevCryptoData.map((data) => {
					if (data.cryptocurrency === crypto) {
						return {
							...data,
							favourite: !isFavorited,
						};
					}
					return data;
				})
			);

			if (isFavorited) {
				setFavourites((prevFavourites) =>
					prevFavourites.filter((favourite) => favourite !== crypto)
				);
				removeFavouriteCryptocurrency(user.email!, crypto);
			} else {
				setFavourites((prevFavourites) => [...prevFavourites, crypto]);
				addFavouriteCryptocurrency(user.email!, crypto);
			}
		};

		updateFavoritedCrypto();
	};

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
							onClick={() =>
								toggleFavorite(item["cryptocurrency"])
							}
						/>
					);
				} else {
					return (
						<Image
							src="/iconmonstr-heart-thin.svg"
							alt="me"
							width="32"
							height="32"
							onClick={() =>
								toggleFavorite(item["cryptocurrency"])
							}
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

	function handleDisplayLogic(): ReactNode {
		if (cryptoData.length > 0) {
			if (loading) {
				return renderTable(cryptoData);
			} else {
				return <p>Loading</p>;
			}
		} else if (!user) {
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
