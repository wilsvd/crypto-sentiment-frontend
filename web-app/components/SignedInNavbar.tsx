import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import dynamic from "next/dynamic";

function SignedInNavbar() {
	return (
		<Navbar isBordered variant="sticky">
			<Navbar.Brand css={{ mr: "$4" }}>
				<Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
					ACME
				</Text>
				<Navbar.Content hideIn="xs" variant="highlight">
					<Navbar.Link isActive href="#">
						Dashboard
					</Navbar.Link>
					<Navbar.Link href="#">Watchlist</Navbar.Link>
					<Navbar.Link href="#">About</Navbar.Link>
				</Navbar.Content>
			</Navbar.Brand>
			<Navbar.Content
				css={{
					"@xsMax": {
						w: "100%",
						jc: "space-between",
					},
				}}
			>
				<Navbar.Item
					css={{
						"@xsMax": {
							w: "100%",
							jc: "center",
						},
					}}
				>
					<Input
						clearable
						contentLeftStyling={false}
						css={{
							w: "100%",
							"@xsMax": {
								mw: "300px",
							},
							"& .nextui-input-content--left": {
								h: "100%",
								ml: "$4",
								dflex: "center",
							},
						}}
						id="email"
						placeholder="Search..."
					/>
				</Navbar.Item>
				<Dropdown placement="bottom-right">
					<Navbar.Item>
						<Dropdown.Trigger>
							<Avatar
								bordered
								as="button"
								color="primary"
								size="md"
								src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
							/>
						</Dropdown.Trigger>
					</Navbar.Item>
					<Dropdown.Menu
						aria-label="User menu actions"
						color="secondary"
						onAction={(actionKey) => console.log({ actionKey })}
					>
						{/* TODO: Refactor this code to use props*/}

						<Dropdown.Item key="profile" css={{ height: "$18" }}>
							<Text b color="inherit" css={{ d: "flex" }}>
								Signed in as
							</Text>
							<Text b color="inherit" css={{ d: "flex" }}>
								zoey@example.com
							</Text>
						</Dropdown.Item>
						<Dropdown.Item key="settings" withDivider>
							My Settings
						</Dropdown.Item>
						<Dropdown.Item key="team_settings">
							Team Settings
						</Dropdown.Item>
						<Dropdown.Item key="analytics" withDivider>
							Analytics
						</Dropdown.Item>
						<Dropdown.Item key="system">System</Dropdown.Item>
						<Dropdown.Item key="configurations">
							Configurations
						</Dropdown.Item>
						<Dropdown.Item key="help_and_feedback" withDivider>
							Help & Feedback
						</Dropdown.Item>
						<Dropdown.Item key="logout" withDivider color="error">
							Log Out
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Navbar.Content>
		</Navbar>
	);
}

export default dynamic(() => Promise.resolve(SignedInNavbar), { ssr: false });
