import { Table } from "@nextui-org/react";

export default function DefaultTable() {
	// Temporary data to experiment with using table component
	type Col = {
		[key: string]: string;
		label: string;
	};

	type Cols = Col[];

	const columns: Cols = [
		{
			key: "name",
			label: "NAME",
		},
		{
			key: "role",
			label: "ROLE",
		},
		{
			key: "status",
			label: "STATUS",
		},
	];

	type Row = {
		[key: string]: string;
		name: string;
		role: string;
		status: string;
	};
	type Rows = Row[];

	const rows: Rows = [
		{
			key: "1",
			name: "Tony Reichert",
			role: "CEO",
			status: "Active",
		},
		{
			key: "2",
			name: "Zoey Lang",
			role: "Technical Lead",
			status: "Paused",
		},
		{
			key: "3",
			name: "Jane Fisher",
			role: "Senior Developer",
			status: "Active",
		},
		{
			key: "4",
			name: "William Howard",
			role: "Community Manager",
			status: "Vacation",
		},
	];

	return (
		<Table
			aria-label="Example table with dynamic content"
			css={{
				height: "auto",
				minWidth: "100%",
			}}
		>
			<Table.Header columns={columns}>
				{(column) => (
					<Table.Column key={column.key}>{column.label}</Table.Column>
				)}
			</Table.Header>
			<Table.Body items={rows}>
				{(item) => (
					<Table.Row key={item.key}>
						{(columnKey) => (
							<Table.Cell>{item[columnKey]}</Table.Cell>
						)}
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	);
}
