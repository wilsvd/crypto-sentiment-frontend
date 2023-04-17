import { Container, Table, Text } from "@nextui-org/react";
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { columns, Row, Rows, TablePropsT } from "@/types";
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
import { selectCryptoLoaded, setCryptoData } from "@/store/cryptoslice";
import { useRouter } from "next/router";
import { AppDispatch } from "@/store/store";
import { toggleFavorite } from "@/utility/favouriting";

const DCryptoGauge = dynamic(
	() => import("@/components/cryptodata/CryptoGauge"),
	{
		ssr: false,
	}
);

export default function CryptoTable({ cryptoData, watchlist }: TablePropsT) {
	const router = useRouter();

	const user = useAppSelector(selectUser);

	const userFavourites = useAppSelector(selectFavourites);
	const userFavouritesLoaded = useAppSelector(selectFavLoaded);

	const cryptoLoaded = useAppSelector(selectCryptoLoaded);

	const dispatch = useAppDispatch();

	const renderCell = (item: Row, columnKey: React.Key) => {
		const cellValue = item[columnKey];
		switch (columnKey) {
			case "favourite":
				if (cellValue) {
					return (
						<Image
							key={`favourite-image-${item.key}`}
							data-testid={`favourite-image-${item.key}`}
							style={{ cursor: "pointer" }}
							aria-labelledby={`favourite-image-${item.key}`}
							src="/red-heart-icon.svg"
							alt="me"
							width="32"
							height="32"
							onClick={() =>
								toggleFavorite(
									user,
									cryptoData,
									userFavourites,
									item["cryptocurrency"],
									dispatch
								)
							}
						/>
					);
				} else {
					return (
						<Image
							key={`unfavourite-image-${item.key}`}
							data-testid={`unfavourite-image-${item.key}`}
							style={{ cursor: "pointer" }}
							aria-labelledby={`unfavourite-image-${item.key}`}
							src="/iconmonstr-heart-thin.svg"
							alt="me"
							width="32"
							height="32"
							onClick={() =>
								toggleFavorite(
									user,
									cryptoData,
									userFavourites,
									item["cryptocurrency"],
									dispatch
								)
							}
						/>
					);
				}
			case "cryptocurrency":
				return (
					<Text h5>
						<Link
							key={`link-${item.key}`}
							aria-labelledby={`link-${item.key}`}
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
						key={`sentiment-container-${item.key}`}
						aria-labelledby={`sentiment-container-${item.key}`}
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
				aria-labelledby="crypto-table"
				data-testid="crypto-table"
				// bordered={true}
				// shadow={false}
				// fixed
				// css={{
				// 	height: "auto",
				// 	minWidth: "100%",

				// 	padding: "10px",
				// 	zIndex: "0",
				// }}
			>
				<Table.Header columns={columns}>
					{(column) => (
						<Table.Column
							key={column.key}
							aria-labelledby={column.key}
							css={{
								width: "50",
							}}
						>
							{column.label}
						</Table.Column>
					)}
				</Table.Header>
				<Table.Body items={liveData} aria-labelledby={"table-body"}>
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
				/>
			</Table>
		);
	};

	function handleDisplayLogic(): ReactNode {
		if (cryptoLoaded) {
			switch (router.asPath) {
				case "/":
					return renderTable(cryptoData);
				case "/watchlist":
					if (!user) {
						return (
							<Text h5 data-testid={`account-required`}>
								You must have an account to be able to keep a
								watchlist
							</Text>
						);
					} else {
						if (watchlist && watchlist.length > 0) {
							return <>{renderTable(watchlist)}</>;
						} else {
							return (
								<Text
									h5
									aria-labelledby="no-cryptos-added"
									data-testid="no-cryptos-added"
								>
									You have not added any cryptocurrencies to
									your watchlist
								</Text>
							);
						}
					}
				default:
					return null;
			}
		} else {
			<Text h5>Loading</Text>;
		}
	}
	return <>{handleDisplayLogic()}</>;
}
