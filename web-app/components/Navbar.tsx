import { Navbar, Text, Button, Input, Link } from "@nextui-org/react";
import NextLink from "next/link";

import { Spacer } from "@nextui-org/react";

import { useRouter } from "next/router";
import UserDropdown from "./UserDropdown";
import UserAuth from "./UserAuth";

import { selectUser } from "@/store/authslice";
import { useAppSelector } from "@/store/hooks";
import NavbarSearch from "./NavbarSearch";
import { useState } from "react";

export default function DefaultNavbar() {
	const { asPath } = useRouter();
	const user = useAppSelector(selectUser);

	const [toggleState, setToggleState] = useState(false);

	const baseNavbar = [
		["Dashboard", "/"],
		["Watchlist", "/watchlist"],
		["About", "/about"],
	];

	const yesUserNavbar = [
		["Dashboard", "/"],
		["Watchlist", "/watchlist"],
		["About", "/about"],
		["Account Settings", "/settings"],
	];

	const noUserNavbar = [
		["Dashboard", "/"],
		["Watchlist", "/watchlist"],
		["About", "/about"],
		["Login", "/login"],
		["Sign Up", "/signup"],
	];

	function CollapseMenu() {
		const collapseMenu = user ? yesUserNavbar : noUserNavbar;
		return (
			<>
				{collapseMenu.map((item, index) => {
					return asPath == `${item[1]}` ? (
						<Navbar.CollapseItem
							key={item[0]}
							onClick={() => setToggleState(true)}
							isActive={asPath == `${item[1]}` ? true : false}
						>
							{item[0]}
						</Navbar.CollapseItem>
					) : (
						<Link
							as={NextLink}
							color="inherit"
							css={{
								minWidth: "100%",
							}}
							href={item[1]}
						>
							<Navbar.CollapseItem
								key={item[0]}
								onClick={() => setToggleState(true)}
								isActive={asPath == `${item[1]}` ? true : false}
							>
								{item[0]}
							</Navbar.CollapseItem>
						</Link>
					);
				})}
			</>
		);
	}

	// console.log(Navbar.Toggle.defaultProps);
	return (
		<Navbar
			isBordered
			borderWeight="bold"
			variant="sticky"
			aria-labelledby="navbar-base"
			maxWidth="fluid"
			css={{ zIndex: "$10" }}
		>
			<Navbar.Toggle
				// onClick={
				// 	"document.body.style.overflow = document.body.style.overflow == 'hidden' ? 'auto' : 'hidden' "
				// }
				aria-label="toggle navigation"
				showIn={"sm"}
			/>

			<Navbar.Brand>
				<Text b color="inherit">
					Crypto Sentiment for Reddit
				</Text>
			</Navbar.Brand>
			<Spacer x={1} />

			<Navbar.Content
				enableCursorHighlight
				hideIn="sm"
				variant="underline"
				css={{ marginRight: "auto" }}
			>
				{baseNavbar.map((item, index) => (
					<Navbar.Link
						key={item[0]}
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
				{user ? <UserDropdown /> : <UserAuth />}
			</Navbar.Content>

			<Navbar.Collapse>
				<CollapseMenu />
			</Navbar.Collapse>
		</Navbar>
	);
}
