import { Navbar } from "@nextui-org/react";

import { useRouter } from "next/router";

import { User, selectUser } from "@/store/authslice";
import useMediaQuery, { MediaBreakpoints, useAppSelector } from "@/store/hooks";
import BigNavbarContent from "./BigNavbarContent";
import SmallNavbarContent from "./SmallNavbarContent";

/**
 * The props for the `BigNavbarContent` and `SmallNavbarContent` components.
 *
 * @typedef NavProps - A new type named 'NavProps'
 * @property {User | null} user - The authenticated user data.
 * @property {string} asPath - The current route.
 */
export type NavProps = {
	user: User | null;
	asPath: string;
};

/**
 * The default navigation bar component which renders either a big or a small navbar based on the screen size.
 *
 * @return {JSX.Element} The JSX code for the default navigation bar.
 */
export default function DefaultNavbar(): JSX.Element {
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
