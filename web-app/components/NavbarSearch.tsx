import { getAllLatestSentiments, LatestSentiment } from "@/utility/firestore";
import {
	Col,
	Container,
	Grid,
	Input,
	Link,
	Row,
	Spacer,
	Table,
	Text,
} from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

// export const getServerSideProps: GetServerSideProps = async () => {
// 	const sentiments = await getAllLatestSentiments();
// 	return {
// 		props: {
// 			cryptocurrencyList: sentiments,
// 		},
// 	};
// };

export default function NavbarSearch() {
	const columns = [
		{
			key: "cryptocurrency",
			label: "Cryptocurrency",
		},
	];

	const [cryptocurrencies, setCryptocurrencies] = useState<
		LatestSentiment[] | null
	>(null);
	const [searchedCrypto, setSearchedCrypto] = useState<
		LatestSentiment[] | null
	>();
	useEffect(() => {
		async function getItems() {
			const sentiments = await getAllLatestSentiments();
			Promise.all(sentiments).then((crypto) =>
				setCryptocurrencies(crypto)
			);
		}
		getItems();
	}, []);

	function handleChange(event: { target: { name: string; value: string } }) {
		const value = event.target.value.toLowerCase();
		if (value.length > 0) {
			const results = cryptocurrencies?.filter((crypto) => {
				const cryptoID = crypto.id.toLocaleLowerCase();
				return cryptoID.match(value);
			});
			setSearchedCrypto(results);
		} else {
			setSearchedCrypto(null);
		}
	}

	return (
		<Container
			display="flex"
			direction="column"
			justify="center"
			alignItems="center"
		>
			<Row>
				<Col>
					<Input
						aria-labelledby="navbar-search"
						bordered
						fullWidth={true}
						borderWeight="normal"
						clearable
						disabled={cryptocurrencies == null ? true : false}
						placeholder={
							cryptocurrencies == null
								? "One moment please..."
								: "Search..."
						}
						onChange={handleChange}
					/>
				</Col>
			</Row>
			<Row css={{ position: "absolute", top: 60 }}>
				<Col>
					{searchedCrypto && (
						<Table
							compact
							border={0}
							aria-labelledby="search-results"
							containerCss={{
								backgroundColor: "White",
								maxWidth: "300px",
								maxHeight: "500px",
								overflowY: "scroll",
								borderRadius: "0px",
							}}
							css={{
								minWidth: "50%",
								maxWidth: "89%",
								width: "300px",
							}}
						>
							<Table.Header columns={columns}>
								{(column) => (
									<Table.Column
										key={column.key}
										css={{ borderRadius: "0px" }}
									>
										{column.label}
									</Table.Column>
								)}
							</Table.Header>
							<Table.Body items={searchedCrypto}>
								{(item) => (
									<Table.Row key={item.id}>
										<Table.Cell>
											<Link
												aria-labelledby="dashboard-table-crypto-link"
												style={{
													textDecoration: "underline",
												}}
												href={`currencies/${item.id}`}
											>
												<Text h5>{item.id}</Text>
											</Link>
										</Table.Cell>
									</Table.Row>
								)}
							</Table.Body>
						</Table>
					)}
				</Col>
			</Row>
		</Container>
	);
}
