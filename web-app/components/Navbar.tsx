import { Navbar, Text, Button, Input, Link, Modal } from "@nextui-org/react";
import NextLink from "next/link";

import { Spacer } from "@nextui-org/react";

import { useRouter } from "next/router";
import UserDropdown from "./UserDropdown";
import UserAuth from "./UserAuth";

import { User, selectUser } from "@/store/authslice";
import useMediaQuery, { MediaBreakpoints, useAppSelector } from "@/store/hooks";
import NavbarSearch from "./NavbarSearch";
import { useRef, useState } from "react";

export default function DefaultNavbar() {
	const isSmallScreen = useMediaQuery(`(max-width: ${MediaBreakpoints.sm})`);
	const isTinyScreen = useMediaQuery(`(max-width: ${412})`);

	const { asPath } = useRouter();
	const user = useAppSelector(selectUser);

	const baseNavbar: string[][] = [
		["Dashboard", "/"],
		["Watchlist", "/watchlist"],
		["About", "/about"],
	];

	const yesUserNavbar: string[][] = [
		["Dashboard", "/"],
		["Watchlist", "/watchlist"],
		["About", "/about"],
		["Account Settings", "/settings"],
	];

	const noUserNavbar: string[][] = [
		["Dashboard", "/"],
		["Watchlist", "/watchlist"],
		["About", "/about"],
		["Login", "/login"],
		["Sign Up", "/signup"],
	];

	const navbarItems = [baseNavbar, yesUserNavbar, noUserNavbar];

	return (
		<Navbar
			isBordered
			borderWeight="bold"
			variant="sticky"
			aria-labelledby="navbar-base"
			maxWidth="fluid"
			containerCss={{ width: "100%" }}
			css={{ zIndex: "$10" }}
		>
			{isSmallScreen ? (
				<SmallScreenNavbar
					user={user}
					navbarItems={navbarItems}
					asPath={asPath}
				></SmallScreenNavbar>
			) : (
				<BigScreenNavbar
					user={user}
					navbarItems={navbarItems}
					asPath={asPath}
				></BigScreenNavbar>
			)}
			<Navbar.Content>
				<Navbar.Item>
					<NavbarSearch />
				</Navbar.Item>
				{user ? <UserDropdown /> : <UserAuth />}
			</Navbar.Content>
		</Navbar>
	);
}

type NavPropsT = {
	user: User | null;
	navbarItems: string[][][];
	asPath: string;
};

function SmallScreenNavbar({ user, navbarItems, asPath }: NavPropsT) {
	const [toggleState, setToggleState] = useState(false);

	const baseNavbar = navbarItems[0];
	const yesUserNavbar = navbarItems[1];
	const noUserNavbar = navbarItems[2];

	const navbarToggleRef = useRef<any>();
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

	const HandleSideMenu = () => {
		isSideMenuOpen && navbarToggleRef?.current?.click();
	};

	const collapseMenu = user ? yesUserNavbar : noUserNavbar;

	console.log("IsOpen", toggleState);
	return (
		<>
			<Navbar.Toggle
				ref={navbarToggleRef}
				onChange={() => {
					setIsSideMenuOpen(!toggleState);
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
								onClick={() => HandleSideMenu()}
							>
								{item[0]}
							</Navbar.CollapseItem>
						</Link>
					);
				})}
			</Navbar.Collapse>
		</>
	);
}

export function BigScreenNavbar({ user, navbarItems, asPath }: NavPropsT) {
	const baseNavbar = navbarItems[0];
	return (
		<>
			<Navbar.Brand>
				<Text b color="inherit">
					Crypto Sentiment for Reddit
				</Text>
			</Navbar.Brand>
			<Spacer x={1} />

			<Navbar.Content
				enableCursorHighlight
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
		</>
	);
}
