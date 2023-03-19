import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "@/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import store from "@/store/store";

import {
	listenForAuthChanges,
	useAppDispatch,
	useAppSelector,
} from "@/store/hooks";
import {
	getAllLatestSentiments,
	getFavouriteCryptocurrencies,
} from "@/utility/firestore";
import { setFavourites } from "@/store/usercryptoslice";
import { setCryptoData, setCryptoLoaded } from "@/store/cryptoslice";

// The way it is currently setup is that I am fetching the same data but then tweaking it slightly.
//

function MyApp({ Component, pageProps }: AppProps) {
	console.log("INITIALISING APP");

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
