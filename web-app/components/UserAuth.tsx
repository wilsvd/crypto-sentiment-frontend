import { Navbar } from "@nextui-org/react";

import NextLink from "next/link";

import { useRouter } from "next/router";

export default function UserAuth() {
	const { asPath } = useRouter();

	return (
		<Navbar.Content variant="highlight">
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
