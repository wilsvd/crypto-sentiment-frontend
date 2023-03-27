import { cryptoDataT, selectCryptoData } from "@/store/cryptoslice";
import { useAppSelector } from "@/store/hooks";
import {
	Col,
	Container,
	Input,
	Link,
	Row,
	Table,
	Text,
} from "@nextui-org/react";
import { useState } from "react";

export default function NavbarSearch() {
	const columns = [
		{
			key: "cryptocurrency",
			label: "Cryptocurrency",
		},
	];

	const [searchedCrypto, setSearchedCrypto] = useState<
		cryptoDataT[] | null
	>();

	const cryptoData = useAppSelector(selectCryptoData);

	function handleChange(event: { target: { name: string; value: string } }) {
		const value = event.target.value.toLowerCase();
		if (value.length > 0) {
			const results = cryptoData.filter(
				(crypto: { cryptocurrency: string }) => {
					const cryptoID = crypto.cryptocurrency.toLowerCase();
					return cryptoID.match(value);
				}
			);
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
						disabled={cryptoData == null ? true : false}
						placeholder={
							cryptoData == null
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
									<Table.Row key={item.key}>
										<Table.Cell>
											<Link
												aria-labelledby="dashboard-table-crypto-link"
												style={{
													textDecoration: "underline",
												}}
												href={`currencies/${item.key}`}
											>
												<Text h5>{item.key}</Text>
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
