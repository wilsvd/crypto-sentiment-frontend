import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";

function SignedInNavbar() {
	const { asPath } = useRouter();

	return (
		<Navbar
			isBordered
			borderWeight="bold"
			variant="sticky"
			aria-label="Navbar for users that have logged in"
			maxWidth="xl"
		>
			<Navbar.Brand css={{ mr: "$4" }}>
				<Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
					Crypto Sentiment for Reddit
				</Text>
				<Navbar.Content hideIn="xs" variant="highlight">
					<Navbar.Link
						isActive={asPath == "/" ? true : false}
						href="/"
					>
						Dashboard
					</Navbar.Link>
					<Navbar.Link
						isActive={asPath == "/watchlist" ? true : false}
						href="/watchlist"
					>
						Watchlist
					</Navbar.Link>
					<Navbar.Link
						isActive={asPath == "/about" ? true : false}
						href="/about"
					>
						About
					</Navbar.Link>
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
							width: "200px",
						},
						"@xlMax": {
							width: "400px",
						},
					}}
				>
					<Input
						bordered
						borderWeight="normal"
						clearable
						contentLeftStyling={false}
						fullWidth={true}
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
