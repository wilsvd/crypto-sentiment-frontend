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
	Image,
	Button,
	useModal,
	Modal,
	Spacer,
} from "@nextui-org/react";
import { useState } from "react";

export default function NavbarSearch() {
	const columns = [
		{
			key: "cryptocurrency",
			label: "Cryptocurrency",
		},
	];

	const [searchedCrypto, setSearchedCrypto] = useState<cryptoDataT[] | null>(
		null
	);
	const [queryString, setQueryString] = useState<string>("");

	const cryptoData = useAppSelector(selectCryptoData);

	function handleChange(event: { target: { name: string; value: string } }) {
		const value = event.target.value.toLowerCase();
		setQueryString(value);
		console.log(value);
		if (value.length > 0) {
			const results = cryptoData.filter(
				(crypto: { cryptocurrency: string }) => {
					const cryptoID = crypto.cryptocurrency.toLowerCase();
					return cryptoID.match(value);
				}
			);
			setSearchedCrypto(results);
		} else {
			setQueryString("");
			setSearchedCrypto(null);
		}
	}

	function SearchIcon({ width, height }: any) {
		return (
			<Image
				aria-labelledby="search-icon"
				src="/icons8-search.svg"
				width={width}
				height={height}
			/>
		);
	}

	const [visible, setVisible] = useState(false);
	const openHandler = () => setVisible(true);
	const closeHandler = () => setVisible(false);

	function renderSearchContainerLargerDevice() {
		return (
			<Container
				css={{
					position: "absolute",
					top: 50,
					"@smMax": { display: "none" },
				}}
			>
				{searchedCrypto && (
					<Table
						fixed
						compact
						aria-labelledby="search-results"
						css={{
							height: "auto",
							width: "auto",
							padding: "$0",
						}}
						containerCss={{
							backgroundColor: "White",
							height: "auto",
							width: "240px",
						}}
					>
						<Table.Header columns={columns}>
							{(column) => (
								<Table.Column
									key={column.key}
									align="start"
									css={{ bg: "white" }}
								>
									{column.label}
								</Table.Column>
							)}
						</Table.Header>
						<Table.Body
							items={searchedCrypto}
							css={{
								display: "block",
								overflowY: "auto",
								height: "50vh",
							}}
						>
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
			</Container>
		);
	}

	return (
		<>
			<Image
				aria-labelledby="search-icon"
				src="/icons8-search.svg"
				width={25}
				height={25}
				onClick={openHandler}
				css={{
					cursor: "pointer",
					"@xsMax": {
						display: "block",
					},
					"@smMin": {
						display: "none",
					},
				}}
			/>
			<Modal
				closeButton
				blur
				open={visible}
				onClose={closeHandler}
				fullScreen
				aria-labelledby="modal-searching"
			>
				<Spacer></Spacer>
				<Modal.Header>
					<Input // This query string logic needs to be improved as its not completely synced with the other <Input>
						aria-labelledby="navbar-search"
						bordered
						fullWidth={true}
						borderWeight="normal"
						initialValue={queryString}
						clearable
						labelLeft={
							<SearchIcon width={20} height={20}></SearchIcon>
						}
						disabled={cryptoData == null ? true : false}
						placeholder={
							cryptoData == null
								? "One moment please..."
								: "Search..."
						}
						onChange={handleChange}
					/>
					<Spacer></Spacer>
					<Button auto flat onPress={closeHandler}>
						Cancel
					</Button>
				</Modal.Header>
				<Modal.Body>
					{searchedCrypto && (
						<Table
							shadow={false}
							compact
							fixed
							aria-labelledby="search-results"
							css={{
								height: "auto",
								width: "auto",
								padding: "$0",
							}}
						>
							<Table.Header columns={columns}>
								{(column) => (
									<Table.Column
										key={column.key}
										align="start"
										css={{ bg: "white" }}
									>
										{column.label}
									</Table.Column>
								)}
							</Table.Header>

							<Table.Body
								items={searchedCrypto}
								css={{
									display: "block",
									overflowY: "auto",
									height: "100vh",
								}}
							>
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
				</Modal.Body>
			</Modal>

			<Input
				aria-labelledby="navbar-search"
				bordered
				fullWidth={true}
				borderWeight="normal"
				initialValue={queryString} // This query string logic needs to be improved as its not completely synced with the other <Input>
				clearable
				labelLeft={<SearchIcon width={20} height={20}></SearchIcon>}
				disabled={cryptoData == null ? true : false}
				placeholder={
					cryptoData == null ? "One moment please..." : "Search..."
				}
				onChange={handleChange}
				css={{
					cursor: "pointer",
					"@smMax": {
						display: "none",
					},
				}}
			/>
			{renderSearchContainerLargerDevice()}
		</>
	);
}
