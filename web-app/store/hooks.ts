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

export const listenForAuthChanges = () => {
	return (dispatch: any) => {
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
				Promise.all(userFavourites).then(async (cryptos) => {
					dispatch(setFavourites(cryptos));
					const latestCryptoSentiments =
						await getAllLatestSentiments();

					Promise.all(latestCryptoSentiments).then((cryptoData) => {
						const result = cryptoData.map((crypto) => {
							const isFavourite = userFavourites.includes(
								crypto.id
							);
							const num_sentiment: number =
								crypto.latestSentiment;
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
				});
			} else {
				dispatch(setUser(null));
				dispatch(setFavourites([]));
			}
		});
	};
};
