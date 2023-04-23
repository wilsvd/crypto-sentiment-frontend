import { CryptoData, selectCryptoData } from "@/store/cryptoslice";
import useMediaQuery, { MediaBreakpoints, useAppSelector } from "@/store/hooks";
import { Container, Input, Table, Image, Text } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import NavbarSearchModal from "../modals/NavbarSearchModal";

export function SearchIcon({ width, height }: any) {
	return (
		<Image
			aria-labelledby="search-icon"
			src="/icons8-search.svg"
			width={width}
			height={height}
		/>
	);
}
export const columns = [
	{
		key: "cryptocurrency",
		label: "Cryptocurrency",
	},
];

/**
 * A component for searching cryptocurrencies in the navbar.
 * @returns JSX.Element
 */
export default function NavbarSearch() {
	// check if the screen is smaller than specified breakpoint value
	const isSmallScreen = useMediaQuery(`(max-width: ${MediaBreakpoints.sm})`);

	// state variables
	const [searchedCrypto, setSearchedCrypto] = useState<CryptoData[] | null>(
		null
	);
	const [queryString, setQueryString] = useState<string>("");

	// get cryptocurrency data from the redux store
	const cryptoData = useAppSelector(selectCryptoData);

	/**
	 * Handle the search input field's change event
	 * @param {Object} event The event object containing the input's target object with its value
	 */
	function handleChange(event: { target: { name: string; value: string } }) {
		const value = event.target.value.toLowerCase();
		setQueryString(value);
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

	const [visible, setVisible] = useState(false);
	const openHandler = () => setVisible(true);
	const closeHandler = () => setVisible(false);

	/**
	 * Render the search container for larger devices
	 * @returns {JSX.Element}
	 */
	function renderSearchContainerLargerDevice(): JSX.Element {
		return (
			<Container
				css={{
					position: "absolute",
					top: 50,
				}}
			>
				{searchedCrypto && (
					<Table
						data-testid="big-screen-navbar-search-result-container"
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
							width: "220px",
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
								height: "50%",
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
											href={`/currencies/${item.key}`}
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
			{isSmallScreen ? (
				/* Render search icon and modal for small screens */
				<>
					<Image
						aria-labelledby="search-icon"
						src="/icons8-search.svg"
						width={25}
						height={25}
						onClick={openHandler}
						containerCss={{
							cursor: "pointer",
							paddingRight: "$4",
							display: "block",
						}}
					/>
					<NavbarSearchModal
						visible={visible}
						closeHandler={closeHandler}
						cryptoData={cryptoData}
						queryString={queryString}
						searchedCrypto={searchedCrypto}
						handleChange={handleChange}
					></NavbarSearchModal>
				</>
			) : (
				/* Render search input and search container for larger screens */
				<>
					<Input
						data-testid="big-screen-navbar-search-input"
						aria-labelledby="navbar-search"
						bordered
						fullWidth={true}
						borderWeight="normal"
						initialValue={queryString} // This query string logic needs to be improved as its not completely synced with the other <Input>
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
					{renderSearchContainerLargerDevice()}
				</>
			)}
		</>
	);
}
