import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "@/components/navbar/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { ReactNode, useEffect } from "react";
import store from "@/store/store";

import { listenForAuthChanges } from "@/store/hooks";

/**
 * Custom App component that wraps around Next.js App component.
 * It provides the NextUIProvider, Navbar and Redux Provider.
 * @param {AppProps} props - The AppProps passed from Next.js App component.
 * @returns {ReactNode} The App component with providers and navbar.
 */
function MyApp({ Component, pageProps }: AppProps): ReactNode {
	// Listen for authentication changes
	useEffect(() => {
		store.dispatch(listenForAuthChanges());
	}, []);

	return (
		<Provider store={store}>
			<NextUIProvider>
				<Navbar />
				<Component {...pageProps} />
			</NextUIProvider>
		</Provider>
	);
}

export default MyApp;
