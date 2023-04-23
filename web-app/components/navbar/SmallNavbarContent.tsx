import { Navbar, Text, Link } from "@nextui-org/react";
import NextLink from "next/link";

import { useState, useRef } from "react";
import { NavProps } from "./Navbar";
import NavbarSearch from "./NavbarSearch";
import UserDropdown from "./UserDropdown";

/**
 * Renders the content of the small version of the navbar, which includes the brand, menu items,
 * a search bar, and a user dropdown menu if the user is logged in.
 *
 * @param {NavProps} props - The props object containing the user object and the current URL path.
 * @returns {JSX.Element} The JSX code for the small navbar content.
 */
export default function SmallNavbarContent({
	user,
	asPath,
}: NavProps): JSX.Element {
	// Define state and ref variables.
	const [toggleState, setToggleState] = useState(false);

	// Define menu items for the navbar based on whether the user is logged in or not.
	// item[0] refers to page name and item[1] refers to the link
	const yesUserMenu: string[][] = [
		["Dashboard", "/"],
		["Watchlist", "/watchlist"],
		["About", "/about"],
		["Account Settings", "/settings"],
	];

	const noUserMenu: string[][] = [
		["Dashboard", "/"],
		["Watchlist", "/watchlist"],
		["About", "/about"],
		["Login", "/login"],
		["Sign Up", "/signup"],
	];

	const navbarToggleRef = useRef<any>();
	const [isMenuOpen, setisMenuOpen] = useState(false);

	/**
	 * A function that handles the menu collapse when an item is clicked.
	 */
	const HandleMenu = () => {
		isMenuOpen && navbarToggleRef?.current?.click();
	};

	const collapseMenu = user ? yesUserMenu : noUserMenu;

	// Render the small navbar content JSX code.
	return (
		<>
			{/* Renders a toggle button for the small navbar */}
			<Navbar.Toggle
				ref={navbarToggleRef}
				onChange={() => {
					// Toggles the menu state when the toggle button is clicked
					setisMenuOpen(!toggleState);
					setToggleState(!toggleState);
				}}
			/>

			{/* Renders the brand name for the small navbar */}
			<Navbar.Brand>
				<Text b color="inherit">
					Crypto Sentiment for Reddit
				</Text>
			</Navbar.Brand>

			{/* Renders the menu items for the small navbar */}
			<Navbar.Collapse css={{ bg: "White" }}>
				{collapseMenu.map((item, index) => {
					return asPath == `${item[1]}` ? (
						// Renders the active menu item for the small navbar
						<Navbar.CollapseItem
							key={`collapse-item-${item[0]}-${index}`}
							isActive={asPath == `${item[1]}` ? true : false}
						>
							{item[0]}
						</Navbar.CollapseItem>
					) : (
						// Renders the non-active menu items for the small navbar
						<Link
							key={`link-${item[0]}-${index}`}
							as={NextLink}
							color="inherit"
							css={{
								minWidth: "100%",
							}}
							href={item[1]}
						>
							<Navbar.CollapseItem
								key={`collapse-item-${item[0]}-${index}`}
								isActive={asPath == `${item[1]}` ? true : false}
								onClick={() => HandleMenu()}
							>
								{item[0]}
							</Navbar.CollapseItem>
						</Link>
					);
				})}
			</Navbar.Collapse>

			<Navbar.Content>
				<Navbar.Item>
					{/* Renders the search bar */}
					<NavbarSearch />
				</Navbar.Item>
				{/* Renders the user dropdown if the user is logged in */}
				{user && <UserDropdown />}
			</Navbar.Content>
		</>
	);
}
