import { Navbar, Text, Button, Link, Input } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext } from "react";

import { AuthContext } from "@/utility/AuthContext";
import UserAuth from "./UserAuth";
import UserDropdown from "./UserDropdown";

function DefaultNavbar() {
	const { user, setUser } = useContext(AuthContext);

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
						placeholder="Search..."
					/>
				</Navbar.Item>
				<Spacer x={1} />
				{user ? <UserDropdown /> : <UserAuth />}
			</Navbar.Content>
		</Navbar>
	);
}

// export default dynamic(() => Promise.resolve(DefaultNavbar), { ssr: false });
export default DefaultNavbar;
