import { auth } from "@/config/firebase";
import {
	getAllLatestSentiments,
	getFavouriteCryptocurrencies,
} from "@/utility/firestore";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setUser, User } from "./authslice";
import { setCryptoData } from "./cryptoslice";

import type { AppDispatch, AppState } from "./store";
import { setFavourites } from "./usercryptoslice";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export function listenForAuthChanges() {
	return (dispatch: AppDispatch) => {
		auth.onAuthStateChanged(async (user) => {
			console.log("AUTH CHANGING");
			if (user) {
				const userDetails: User = {
					displayName: user.displayName,
					email: user.email,
					emailVerified: user.emailVerified,
					phoneNumber: user.phoneNumber,
				};
				dispatch(setUser(userDetails));
				const userFavourites = await getFavouriteCryptocurrencies(
					userDetails.email!
				);
				Promise.all(userFavourites).then((cryptos) => {
					dispatch(setFavourites(cryptos));
					fetchData(dispatch, cryptos);
				});
			} else {
				dispatch(setUser(null));
				const userFavourites: string[] = [];
				dispatch(setFavourites(userFavourites));
				fetchData(dispatch, userFavourites);
			}
		});
	};
}

async function fetchData(dispatch: AppDispatch, userFavourites: string[]) {
	// Potentially don't need to do another fetch if I already have the data.
	// If I have the data then I can potentially skip fetch and just map across the data according to user or no user.
	const latestCryptoSentiments = await getAllLatestSentiments();

	Promise.all(latestCryptoSentiments).then((cryptoData) => {
		const result = cryptoData.map((crypto) => {
			const isFavourite = userFavourites.includes(crypto.id);
			const num_sentiment: number = crypto.latestSentiment;
			const sub_sentiment = num_sentiment.toFixed(2);
			return {
				key: crypto.id,
				cryptocurrency: crypto.id,
				sentiment: sub_sentiment,
				favourite: isFavourite,
			};
		});
		dispatch(setCryptoData(result));
	});
}

import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}
		const listener = () => setMatches(media.matches);
		window.addEventListener("resize", listener);
		return () => window.removeEventListener("resize", listener);
	}, [matches, query]);

	return matches;
};
export const MediaBreakpoints = {
	xs: "650px",
	sm: "960px",
	md: "1280px",
	lg: "1400px",
	xl: "1920px",
};

export default useMediaQuery;
