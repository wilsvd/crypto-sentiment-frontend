import { Navbar, Text, Link } from "@nextui-org/react";

import { useRouter } from "next/router";

import { User, selectUser } from "@/store/authslice";
import useMediaQuery, { MediaBreakpoints, useAppSelector } from "@/store/hooks";
import BigNavbarContent from "./BigNavbarContent";
import SmallNavbarContent from "./SmallNavbarConten1t";

export default function DefaultNavbar() {
	const isSmallScreen = useMediaQuery(`(max-width: ${MediaBreakpoints.sm})`);

	const { asPath } = useRouter();
	const user = useAppSelector(selectUser);

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
				<SmallNavbarContent
					user={user}
					asPath={asPath}
				></SmallNavbarContent>
			) : (
				<BigNavbarContent
					user={user}
					asPath={asPath}
				></BigNavbarContent>
			)}
		</Navbar>
	);
}

export type NavPropsT = {
	user: User | null;
	asPath: string;
};
