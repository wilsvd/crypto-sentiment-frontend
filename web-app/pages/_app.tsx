import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "@/components/Navbar";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

import { AuthProvider } from "@/utility/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider>
			<AuthProvider>
				<Navbar />
				<Component {...pageProps} />
			</AuthProvider>
		</NextUIProvider>
	);
}

export default MyApp;
