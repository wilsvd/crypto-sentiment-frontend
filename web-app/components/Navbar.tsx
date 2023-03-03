import { Navbar, Text, Button, Input } from "@nextui-org/react";
import NextLink from "next/link";

import { Spacer } from "@nextui-org/react";

import { useRouter } from "next/router";
import UserDropdown from "./UserDropdown";
import UserAuth from "./UserAuth";

function DefaultNavbar() {
	const { asPath } = useRouter();
	return (
		<Navbar
			isBordered
			borderWeight="bold"
			variant="sticky"
			aria-label="Navbar for users that have logged in"
			maxWidth="fluid"
		>
			<Navbar.Brand css={{ mr: "$4" }}>
				<Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
					Crypto Sentiment for Reddit
				</Text>
				<Navbar.Content hideIn="xs" variant="highlight">
					<Navbar.Link
						as={NextLink}
						isActive={asPath == "/" ? true : false}
						href="/"
					>
						Dashboard
					</Navbar.Link>
					<Navbar.Link
						as={NextLink}
						isActive={asPath == "/watchlist" ? true : false}
						href="/watchlist"
					>
						Watchlist
					</Navbar.Link>
					<Navbar.Link
						as={NextLink}
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
				<Navbar.Item>
					<Input
						bordered
						borderWeight="normal"
						clearable
						contentLeftStyling={false}
						fullWidth={true}
						placeholder="Search..."
					/>
				</Navbar.Item>
				<Spacer x={1} />
				{/* Is Account Active */}
				{false ? <UserDropdown /> : <UserAuth />}
			</Navbar.Content>
		</Navbar>
	);
}

export default DefaultNavbar;
