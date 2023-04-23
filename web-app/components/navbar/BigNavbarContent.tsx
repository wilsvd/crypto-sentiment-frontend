import { Navbar, Spacer, Text } from "@nextui-org/react";
import { NavProps } from "./Navbar";
import NavbarSearch from "./NavbarSearch";
import UserDropdown from "./UserDropdown";
import NextLink from "next/link";

/**
 * Renders the content for a big navbar, including the brand, base navbar links, search bar, and user dropdown or authentication routes.
 * @param {NavProps} props - Props for the BigNavbarContent component.
 * @returns {JSX.Element} - The JSX element for the big navbar content.
 */
export default function BigNavbarContent({
	user,
	asPath,
}: NavProps): JSX.Element {
	// Define the base navbar links as an array of arrays.
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

			{/* Render the search bar and user dropdown or authentication routes */}
			<Navbar.Content>
				<Navbar.Item>
					<NavbarSearch />
				</Navbar.Item>
				{user ? <UserDropdown /> : <AuthRoutes asPath={asPath} />}
			</Navbar.Content>
		</>
	);
}

/**
 * Renders the authentication routes for the big navbar.
 * @param {Object} props - The props object.
 * @param {string} props.asPath - The path of the current page.
 * @returns {JSX.Element} The JSX element for the authentication routes.
 */
function AuthRoutes({ asPath }: { asPath: string }): JSX.Element {
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
