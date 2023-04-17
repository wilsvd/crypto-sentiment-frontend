import { cryptoDataT, setCryptoData } from "@/store/cryptoslice";
import { AppDispatch } from "@/store/store";
import { setFavourites } from "@/store/usercryptoslice";
import { Dispatch, SetStateAction } from "react";
import {
	removeFavouriteCryptocurrency,
	addFavouriteCryptocurrency,
} from "./firestore";
import { User } from "@/store/authslice";

export const toggleFavorite = (
	user: User | null,
	fullData: cryptoDataT[],
	userFavourites: string[],
	crypto: string,
	dispatch: AppDispatch,
	setIsFavourite: Dispatch<SetStateAction<boolean>> | null = null
) => {
	if (!user || !user.email) {
		alert(
			"You are not logged in. Please create an account or login to favourite cryptocurrencies."
		);
		return;
	}

	const isFavorited = userFavourites.includes(crypto);
	if (setIsFavourite) {
		setIsFavourite(!isFavorited);
	}

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
};
