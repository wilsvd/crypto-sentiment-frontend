import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

/**
 * Defines the structure of a cryptocurrency object.
 * @typedef {Object} CryptoData - A new type named 'CryptoData'.
 * @property {string} key - The unique identifier of the cryptocurrency.
 * @property {string} cryptocurrency - The name of the cryptocurrency.
 * @property {string} sentiment - The sentiment of the cryptocurrency.
 * @property {boolean} favourite - Whether the cryptocurrency is a favourite or not.
 */
export type CryptoData = {
	key: string;
	cryptocurrency: string;
	sentiment: string;
	favourite: boolean;
};

/**
 * Defines the structure of the crypto state.
 * @interface CryptoState - A new interface named 'CryptoState'.
 * @property {CryptoData[]} data - The list of cryptocurrencies.
 * @property {boolean} loaded - Indicates whether the crypto data is loaded or not.
 */
interface CryptoState {
	data: CryptoData[];
	loaded: boolean;
}

/**
 * The initial state of the CryptoState.
 *
 * @type {CryptoState}
 */
export const initialState: CryptoState = {
	data: [],
	loaded: false,
};

/**
 * A slice of the Redux store that handles the crypto data state.
 */
export const cryptoSlice = createSlice({
	name: "cryptodata",
	initialState,
	reducers: {
		/**
		 * Updates the crypto data state with the given crypto data.
		 *
		 * @function setCryptoData
		 * @param {CryptoState} state - The current state of the crypto data.
		 * @param {PayloadAction<CryptoData[]>} action - The payload containing the new crypto data.
		 */
		setCryptoData: (
			state: CryptoState,
			action: PayloadAction<CryptoData[]>
		) => {
			state.data = action.payload;
			state.loaded = true;
		},
		/**
		 * Updates the crypto loaded state with the given value.
		 *
		 * @function setCryptoLoaded
		 * @param {CryptoState} state - The current state of the crypto data.
		 * @param {PayloadAction<boolean>} action - The payload containing the new value.
		 */
		setCryptoLoaded: (
			state: CryptoState,
			action: PayloadAction<boolean>
		) => {
			state.loaded = action.payload;
		},
	},
});

/**
 * Export the reducers as actions.
 *
 * @exports setFavourites - The setCryptoData reducer as an action.
 * @exports setFavLoaded - The setCryptoLoaded reducer as an action.
 */
export const { setCryptoData, setCryptoLoaded } = cryptoSlice.actions;
export default cryptoSlice.reducer;

/**
 * Selects the crypto data from the app state.
 *
 * @function selectCryptoData
 * @param {AppState} state - The current state of the app.
 * @returns {CryptoData[]} - The list of cryptocurrencies.
 */
export const selectCryptoData = (state: AppState): CryptoData[] =>
	state.cryptoData.data;

/**
 * Selects the crypto loaded state from the app state.
 *
 * @function selectCryptoLoaded
 * @param {AppState} state - The current state of the app.
 * @returns {boolean} - Whether the crypto data is loaded or not.
 */
export const selectCryptoLoaded = (state: AppState): boolean =>
	state.cryptoData.loaded;
