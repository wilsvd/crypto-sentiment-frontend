import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "@/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import store from "@/store/store";

import { listenForAuthChanges } from "@/store/hooks";

function MyApp({ Component, pageProps }: AppProps) {
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
