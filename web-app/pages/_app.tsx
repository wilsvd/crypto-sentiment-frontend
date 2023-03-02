import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "@/components/Navbar";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

import { wrapper } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

// Usage with Redux Sage () => Method may be considered unsafe
// Usage with Redux Persist () => 	"persistence gate is not necessary because the server can already send
// 									some HTML with some state, so it's better to show it right away and then wait for REHYDRATE action
// 									to happen to show additional delta coming from persistence storage. That's why we use Server Side Rendering in the first place."
// 									---- block the UI while rehydration is happening ----

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
