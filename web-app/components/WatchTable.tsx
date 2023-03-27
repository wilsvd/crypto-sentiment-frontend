import { Container, Table, Text } from "@nextui-org/react";
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { columns, Row, Rows } from "@/types";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectUser } from "@/store/authslice";
import {
	addFavouriteCryptocurrency,
	removeFavouriteCryptocurrency,
} from "@/utility/firestore";
import dynamic from "next/dynamic";
import {
	selectFavLoaded,
	selectFavourites,
	setFavourites,
} from "@/store/usercryptoslice";
import {
	selectCryptoData,
	selectCryptoLoaded,
	setCryptoData,
} from "@/store/cryptoslice";

const DCryptoGauge = dynamic(() => import("@/components/CryptoGauge"), {
	ssr: false,
});

export default function DefaultTable() {
	const user = useAppSelector(selectUser);

	const userFavourites = useAppSelector(selectFavourites);
	const userFavouritesLoaded = useAppSelector(selectFavLoaded);

	const cryptoData = useAppSelector(selectCryptoData);
	const cryptoLoaded = useAppSelector(selectCryptoLoaded);

	const dispatch = useAppDispatch();

	const watchlist = cryptoData.filter((value) => value.favourite);

	// Temporary data to experiment with using table component

	const toggleFavorite = (crypto: string) => {
		if (!user || !user.email) {
			console.log("You are not logged in");
			return;
		}

		const isFavorited = userFavourites.includes(crypto);

		const updateFavoritedCrypto = () => {
			const result = cryptoData.map((data) => {
				if (data.cryptocurrency === crypto) {
					return {
						...data,
						favourite: isFavorited ? false : true,
					};
				}
				return { ...data };
			});
			dispatch(setCryptoData(result));

			if (isFavorited) {
				dispatch(
					setFavourites(
						userFavourites.filter(
							(favourite) => favourite !== crypto
						)
					)
				);
				removeFavouriteCryptocurrency(user.email!, crypto);
			} else {
				dispatch(setFavourites([...userFavourites, crypto]));
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
				bordered={true}
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
					rowsPerPage={20}
					onPageChange={(page) => console.log({ page })}
				/>
			</Table>
		);
	};

	function handleDisplayLogic(): ReactNode {
		if (!user) {
			return (
				<Text h5>
					You must have an account to be able to keep a watchlist
				</Text>
			);
		} else {
			if (cryptoLoaded && watchlist.length > 0) {
				return <>{renderTable(watchlist)}</>;
			} else if (cryptoLoaded && watchlist.length === 0) {
				return (
					<Text h5>
						You have not added any cryptocurrencies to your
						watchlist
					</Text>
				);
			} else {
				return <p>Loading</p>;
			}
		}
	}
	return <>{handleDisplayLogic()}</>;
}
