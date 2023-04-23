import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

/**
 * Defines the structure of the crypto state.
 *
 * @interface CryptoState - A new interface named 'CryptoState'.
 * @property {string[]} data - The list of favourited cryptocurrencies.
 * @property {boolean} loaded - Indicates whether the crypto data is loaded or not.
 */
interface CryptoState {
	favourites: string[];
	loaded: boolean;
}

/**
 * Defines the initial state for the user crypto slice.
 *
 * @type {CryptoState}
 */
const initialState: CryptoState = {
	favourites: [],
	loaded: false,
};

/**
 * A slice of the Redux store that handles the user crypto data state.
 */
export const userCryptoSlice = createSlice({
	name: "usercrypto",
	initialState,
	reducers: {
		/**
		 * A reducer for updating the favourite cryptocurrencies.
		 *
		 * @function setFavourites
		 * @param {CryptoState} state - The current crypto state.
		 * @param {PayloadAction<string[]>} action - The Redux action that contains the new favourites.
		 */
		setFavourites: (
			state: CryptoState,
			action: PayloadAction<string[]>
		) => {
			state.favourites = action.payload;
			state.loaded = true;
		},
		/**
		 * A reducer for updating the crypto data load state.
		 *
		 * @function setFavLoaded
		 * @param {CryptoState} state - The current crypto state.
		 * @param {PayloadAction<boolean>} action - The Redux action that contains the new loaded state.
		 */
		setFavLoaded: (state: CryptoState, action: PayloadAction<boolean>) => {
			state.loaded = action.payload;
		},
	},
});

/**
 * Exports the reducers as actions.
 *
 * @exports setFavourites - The setFavourites reducer as an action.
 * @exports setFavLoaded - The setFavLoaded reducer as an action.
 */
export const { setFavourites, setFavLoaded } = userCryptoSlice.actions;
export default userCryptoSlice.reducer;

/**
 * Selects the list of favourited cryptocurrencies.
 *
 * @function selectFavourites
 * @param {AppState} state - The current app state.
 * @returns {string[]} The list of favourited cryptocurrencies.
 */
export const selectFavourites = (state: AppState): string[] =>
	state.userCrypto.favourites;

/**
 * Selects the crypto data load state.
 *
 * @function selectFavLoaded
 * @param {AppState} state - The current app state.
 * @returns {boolean} The crypto data load state.
 */
export const selectFavLoaded = (state: AppState): boolean =>
	state.userCrypto.loaded;
