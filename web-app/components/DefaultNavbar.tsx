import { Navbar, Text, Button, Link, Input } from "@nextui-org/react";
import dynamic from "next/dynamic";

function DefaultNavbar() {
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
					<Navbar.Link href="/watchlist">Watchlist</Navbar.Link>
					<Navbar.Link href="/about">About</Navbar.Link>
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
						placeholder="Search..."
					/>
				</Navbar.Item>

				<Navbar.Link color="inherit" href="#">
					Login
				</Navbar.Link>
				<Navbar.Item>
					<Button auto flat as={Link} href="#">
						Sign Up
					</Button>
				</Navbar.Item>
			</Navbar.Content>
		</Navbar>
	);
}

// export default dynamic(() => Promise.resolve(DefaultNavbar), { ssr: false });

export default DefaultNavbar;
