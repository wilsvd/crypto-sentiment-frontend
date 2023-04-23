import { CryptoData, setCryptoData } from "@/store/cryptoslice";
import { AppDispatch } from "@/store/store";
import { setFavourites } from "@/store/usercryptoslice";
import { Dispatch, SetStateAction } from "react";
import {
	removeFavouriteCryptocurrency,
	addFavouriteCryptocurrency,
} from "./firestore";
import { User } from "@/store/authslice";

/**
 * Toggles the favourite status of a cryptocurrency for a given user and updates the state accordingly.
 *
 * @param {User | null} user - The current user object, or null if the user is not logged in.
 * @param {CryptoData[]} fullData - An array of all cryptocurrency data objects.
 * @param {string[]} userFavourites - An array of the user's favourite cryptocurrencies.
 * @param {string} crypto - The symbol of the cryptocurrency to toggle favourite status.
 * @param {AppDispatch} dispatch - A function to dispatch actions to Redux store.
 * @param {Dispatch<SetStateAction<boolean>> | null} setIsFavourite - Optional function to set the favourite status in the component state.
 * @returns {void}
 */
export function toggleFavorite(
	user: User | null,
	fullData: CryptoData[],
	userFavourites: string[],
	crypto: string,
	dispatch: AppDispatch,
	setIsFavourite: Dispatch<SetStateAction<boolean>> | null = null
) {
	// Check if user is logged in
	if (!user || !user.email) {
		alert(
			"You are not logged in. Please create an account or login to favourite cryptocurrencies."
		);
		return;
	}
	// Determine if the cryptocurrency is already favourited
	const isFavorited = userFavourites.includes(crypto);

	// If a setState function is provided, update the component state with the new favourite status
	if (setIsFavourite) {
		setIsFavourite(!isFavorited);
	}

	// Update the Redux store with the new favourite status
	const updateFavoritedCrypto = () => {
		const result = fullData.map((data) => {
			if (data.cryptocurrency === crypto) {
				return {
					...data,
					favourite: isFavorited ? false : true,
				};
			}
			return { ...data };
		});
		dispatch(setCryptoData(result));

		// Update the user's favourites in the Redux store and Firestore database
		if (isFavorited) {
			dispatch(
				setFavourites(
					userFavourites.filter((favourite) => favourite !== crypto)
				)
			);
			removeFavouriteCryptocurrency(user.email!, crypto);
		} else {
			dispatch(setFavourites([...userFavourites, crypto]));
			addFavouriteCryptocurrency(user.email!, crypto);
		}
	};

	updateFavoritedCrypto();
}
