import { Navbar, Text, Link } from "@nextui-org/react";
import NextLink from "next/link";

import { useState, useRef } from "react";
import { NavPropsT } from "./Navbar";
import NavbarSearch from "./NavbarSearch";
import UserDropdown from "./UserDropdown";

export default function SmallNavbarContent({ user, asPath }: NavPropsT) {
	const [toggleState, setToggleState] = useState(false);

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

	const HandleMenu = () => {
		isMenuOpen && navbarToggleRef?.current?.click();
	};

	const collapseMenu = user ? yesUserMenu : noUserMenu;

	return (
		<>
			<Navbar.Toggle
				ref={navbarToggleRef}
				onChange={() => {
					setisMenuOpen(!toggleState);
					setToggleState(!toggleState);
				}}
			/>

			<Navbar.Brand>
				<Text b color="inherit">
					Crypto Sentiment for Reddit
				</Text>
			</Navbar.Brand>

			<Navbar.Collapse css={{ bg: "White" }}>
				{collapseMenu.map((item, index) => {
					return asPath == `${item[1]}` ? (
						<Navbar.CollapseItem
							key={`collapse-item-${item[0]}-${index}`}
							isActive={asPath == `${item[1]}` ? true : false}
						>
							{item[0]}
						</Navbar.CollapseItem>
					) : (
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
					<NavbarSearch />
				</Navbar.Item>
				{user && <UserDropdown />}
			</Navbar.Content>
		</>
	);
}
