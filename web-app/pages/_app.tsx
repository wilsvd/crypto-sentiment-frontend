import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "@/components/Navbar";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

import { wrapper } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
	const store: any = useStore();
	return (
		<PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
			<NextUIProvider>
				<Navbar />
				<Component {...pageProps} />
			</NextUIProvider>
		</PersistGate>
	);
}

export default wrapper.withRedux(MyApp);
