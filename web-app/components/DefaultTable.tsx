import { Container, Table, Text } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/authslice";
import {
	addFavouriteCryptocurrency,
	removeFavouriteCryptocurrency,
} from "@/utility/firestore";

import {
	selectFavLoaded,
	selectFavourites,
	setFavourites,
} from "@/store/usercryptoslice";
import { columns, Row, Rows, TablePropsT } from "@/types";
import dynamic from "next/dynamic";
import {
	selectCryptoData,
	selectCryptoLoaded,
	setCryptoData,
} from "@/store/cryptoslice";

const DCryptoGauge = dynamic(() => import("@/components/CryptoGauge"), {
	ssr: false,
});

export default function DefaultTable({ cryptoData }: TablePropsT) {
	const user = useAppSelector(selectUser);

	const userFavourites = useAppSelector(selectFavourites);
	const userFavouritesLoaded = useAppSelector(selectFavLoaded);

	const cryptoLoaded = useAppSelector(selectCryptoLoaded);

	const dispatch = useAppDispatch();

	const toggleFavorite = (crypto: string) => {
		if (!user || !user.email) {
			alert(
				"You are not logged in. Please create an account or login to favourite cryptocurrencies."
			);
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
							style={{ cursor: "pointer" }}
							aria-labelledby="dashboard-table-favourite"
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
							style={{ cursor: "pointer" }}
							aria-labelledby="dashboard-table-unfavourite"
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
					<Text h5>
						<Link
							aria-labelledby="dashboard-table-crypto-link"
							style={{ textDecoration: "underline" }}
							href={`/currencies/${cellValue}`}
						>
							{cellValue}
						</Link>
					</Text>
				);
			case "sentiment":
				return (
					<Container
						aria-labelledby="dashboard-table-sentiment-container-1"
						fluid
						css={{ padding: "$0" }}
						display="flex"
						justify="flex-start"
					>
						<Text h5>{cellValue}</Text>

						<DCryptoGauge
							crypto={{
								id: item["cryptocurrency"],
								latestSentiment: parseFloat(item["sentiment"]),
							}}
							style={{ width: 50 }}
						/>
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
				fixed
				css={{
					height: "auto",
					minWidth: "100%",

					padding: "10px",
					zIndex: "0",
				}}
			>
				<Table.Header columns={columns}>
					{(column) => (
						<Table.Column
							key={column.key}
							css={{
								width: "50",
							}}
						>
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

	return (
		<>
			{cryptoLoaded ? (
				<>{renderTable(cryptoData)}</>
			) : (
				<Text h5>Loading</Text>
			)}
		</>
	);
}
