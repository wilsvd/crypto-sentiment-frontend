import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "@/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "@/store/store";

function MyApp({ Component, pageProps }: AppProps) {
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
