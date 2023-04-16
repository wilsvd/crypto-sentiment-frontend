import { Navbar, Spacer, Text } from "@nextui-org/react";
import { NavPropsT } from "./Navbar";
import NavbarSearch from "./NavbarSearch";
import UserDropdown from "./UserDropdown";
import NextLink from "next/link";

export default function BigNavbarContent({ user, asPath }: NavPropsT) {
	const baseNavbar: string[][] = [
		["Dashboard", "/"],
		["Watchlist", "/watchlist"],
		["About", "/about"],
	];
	return (
		<>
			<Navbar.Brand>
				<Text b color="inherit">
					Crypto Sentiment for Reddit
				</Text>
			</Navbar.Brand>
			<Spacer x={1} />

			<Navbar.Content
				enableCursorHighlight={true}
				variant="underline"
				css={{ marginRight: "auto" }}
			>
				{baseNavbar.map((item, index) => (
					<Navbar.Link
						key={`${item[0]}-${index}`}
						aria-labelledby={`dashboard-link-${item[0]}`}
						as={NextLink}
						isActive={asPath == `${item[1]}` ? true : false}
						href={item[1]}
					>
						{item[0]}
					</Navbar.Link>
				))}
			</Navbar.Content>

			<Navbar.Content>
				<Navbar.Item>
					<NavbarSearch />
				</Navbar.Item>
				{user ? <UserDropdown /> : <AuthRoutes asPath={asPath} />}
			</Navbar.Content>
		</>
	);
}

// type AuthRouteT = {
// 	asPath: string
// }

function AuthRoutes({ asPath }: { asPath: string }) {
	return (
		<Navbar.Content enableCursorHighlight={true}>
			<Navbar.Link
				color="inherit"
				href="/login"
				as={NextLink}
				isActive={asPath == "/login" ? true : false}
			>
				Login
			</Navbar.Link>
			<Navbar.Link
				color="inherit"
				href="/signup"
				as={NextLink}
				isActive={asPath == "/signup" ? true : false}
				css={{
					whiteSpace: "nowrap",
				}}
			>
				Sign Up
			</Navbar.Link>
		</Navbar.Content>
	);
}
