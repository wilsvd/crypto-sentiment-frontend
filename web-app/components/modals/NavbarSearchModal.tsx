import { Modal, Button, Spacer, Input, Table, Text } from "@nextui-org/react";

import { cryptoDataT } from "@/store/cryptoslice";
import { SearchIcon, columns } from "../navbar/NavbarSearch";
import Link from "next/link";

type Props = {
	visible: boolean;
	closeHandler: () => void;
	cryptoData: cryptoDataT[];
	queryString: string;
	searchedCrypto: cryptoDataT[] | null;
	handleChange: (event: { target: { name: string; value: string } }) => void;
};

export default function NavbarSearchModal({
	visible,
	closeHandler,
	cryptoData,
	queryString,
	searchedCrypto,
	handleChange,
}: Props) {
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
