import { Navbar, Text, Button, Input } from "@nextui-org/react";
import NextLink from "next/link";

import { Spacer } from "@nextui-org/react";

import { useRouter } from "next/router";
import UserDropdown from "./UserDropdown";
import UserAuth from "./UserAuth";

import { selectUser } from "@/store/authslice";
import { useAppSelector } from "@/store/hooks";
import NavbarSearch from "./NavbarSearch";

function DefaultNavbar() {
	const { asPath } = useRouter();
	const user = useAppSelector(selectUser);
	return (
		<Navbar
			isBordered
			borderWeight="bold"
			variant="sticky"
			aria-labelledby="navbar-base"
			maxWidth="fluid"
		>
			<Navbar.Brand css={{ mr: "$4" }}>
				<Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
					Crypto Sentiment for Reddit
				</Text>
				<Navbar.Content hideIn="xs" variant="highlight">
					<Navbar.Link
						aria-labelledby="dashboard-link-dashboard"
						as={NextLink}
						isActive={asPath == "/" ? true : false}
						href="/"
					>
						Dashboard
					</Navbar.Link>
					<Navbar.Link
						aria-labelledby="dashboard-link-watchlist"
						as={NextLink}
						isActive={asPath == "/watchlist" ? true : false}
						href="/watchlist"
					>
						Watchlist
					</Navbar.Link>
					<Navbar.Link
						aria-labelledby="dashboard-link-about"
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
					<NavbarSearch />
				</Navbar.Item>
				<Spacer x={1} />
				{user ? <UserDropdown /> : <UserAuth />}
			</Navbar.Content>
		</Navbar>
	);
}

export default DefaultNavbar;
