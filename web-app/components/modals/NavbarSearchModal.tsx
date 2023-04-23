import { Modal, Button, Spacer, Input, Table, Text } from "@nextui-org/react";

import { CryptoData } from "@/store/cryptoslice";
import { SearchIcon, columns } from "../navbar/NavbarSearch";
import Link from "next/link";

/**
 * SearchProps for the NavbarSearchModal component.
 *
 * @typedef {Object} SearchProps - A new type named 'SearchProps'
 * @property {boolean} visible - Whether the modal is visible or not.
 * @property {Function} closeHandler - Function to close the modal.
 * @property {CryptoData[]} cryptoData - Array of objects containing cryptocurrency data.
 * @property {string} queryString - The query string used to search for cryptocurrencies.
 * @property {CryptoData[] | null} searchedCrypto - Array of objects containing cryptocurrency data that match the search query.
 * @property {Function} handleChange - Function to handle changes to the search input field.
 */
type SearchProps = {
	visible: boolean;
	closeHandler: () => void;
	cryptoData: CryptoData[];
	queryString: string;
	searchedCrypto: CryptoData[] | null;
	handleChange: (event: { target: { name: string; value: string } }) => void;
};

/**
 * A component that displays a modal for searching cryptocurrencies.
 * @param {SearchProps} props - Props for the NavbarSearchModal component.
 * @returns {JSX.Element} - JSX element.
 */
export default function NavbarSearchModal({
	visible,
	closeHandler,
	cryptoData,
	queryString,
	searchedCrypto,
	handleChange,
}: SearchProps) {
	return (
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
					labelLeft={<SearchIcon width={20} height={20}></SearchIcon>}
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
								height: "100%",
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
											onClick={closeHandler}
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
			</Modal.Body>
		</Modal>
	);
}
