import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

import DefaultNavbar from "@/components/DefaultNavbar";
import SignedInNavbar from "@/components/SignedInNavbar";

function MyApp({ Component, pageProps }: AppProps) {
	const [login, setLogin] = React.useState(false);

	const Navbar = login ? <SignedInNavbar /> : <DefaultNavbar />;
	return (
		<NextUIProvider>
			{Navbar}
			<Component {...pageProps} />
		</NextUIProvider>
	);
}

export default MyApp;
