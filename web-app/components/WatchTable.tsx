import { Button, Container, Table, Text } from "@nextui-org/react";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Cols, columns, Row, Rows } from "@/types";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectUser } from "@/store/authslice";
import {
	addFavouriteCryptocurrency,
	getFavouriteCryptocurrencies,
	getFavouriteLatestSentiments,
	removeFavouriteCryptocurrency,
} from "@/utility/firestore";
import dynamic from "next/dynamic";
import {
	selectFavLoaded,
	selectFavourites,
	setFavourites,
} from "@/store/cryptoslice";

const DCryptoGauge = dynamic(() => import("@/components/CryptoGauge"), {
	ssr: false,
});

export default function DefaultTable() {
	const user = useAppSelector(selectUser);
	const favourites = useAppSelector(selectFavourites);
	const isFavLoaded = useAppSelector(selectFavLoaded);

	const dispatch = useAppDispatch();

	const [loading, setLoading] = React.useState(false);
	const [cryptoData, setCryptoData] = React.useState<Rows>([]);

	const prevFavouritesRef = useRef<string[]>([]);
	useEffect(() => {
		async function getFavourites() {
			if (user && user.email) {
				const userFavourites = await getFavouriteCryptocurrencies(
					user.email
				);
				console.log(userFavourites);
				setFavourites(userFavourites);
			} else {
				console.log(
					"Account not logged in, cannot retrieve favourites"
				);
				setFavourites([]);
			}
		}
		getFavourites();
	}, [user]);

	useEffect(() => {
		if (!isFavLoaded) return;
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
	}, [isFavLoaded, favourites]);

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
				dispatch(
					setFavourites(
						favourites.filter((favourite) => favourite !== crypto)
					)
				);
				removeFavouriteCryptocurrency(user.email!, crypto);
			} else {
				dispatch(setFavourites([...favourites, crypto]));
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
							aria-labelledby="watchlist-table-favourite"
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
							aria-labelledby="watchlist-table-unfavourite"
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
						aria-labelledby="watchlist-table-crypto-link"
						style={{ textDecoration: "underline" }}
						href={`currencies/${cellValue}`}
					>
						<Text h5>{cellValue}</Text>
					</Link>
				);
			case "sentiment":
				return (
					<Container
						aria-labelledby="watchlist-table-sentiment-container-1"
						fluid
						display="flex"
						style={{
							height: "50px",
							width: "200px",
							float: "left",
							alignContent: "space-between",
						}}
					>
						<Text h5 css={{ float: "left" }}>
							{cellValue}
						</Text>
						<Container
							aria-labelledby="watchlist-table-sentiment-container-2"
							style={{
								marginRight: "0px",
								height: "50px",
								width: "110px",
							}}
						>
							<DCryptoGauge
								crypto={{
									id: item["cryptocurrency"],
									latestSentiment: parseFloat(
										item["sentiment"]
									),
								}}
							></DCryptoGauge>
						</Container>
					</Container>
				);
		}
	};

	const renderTable = (liveData: Rows) => {
		return (
			<Table
				aria-labelledby="watchlist-table"
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
				<Table.Pagination
					shadow
					noMargin
					align="center"
					rowsPerPage={8}
					onPageChange={(page) => console.log({ page })}
				/>
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
