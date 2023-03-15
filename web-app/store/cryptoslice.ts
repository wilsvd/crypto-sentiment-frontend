import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

interface CryptoState {
	favourites: string[];
	loaded: boolean;
}

const initialState: CryptoState = {
	favourites: [],
	loaded: false,
};

export const cryptoSlice = createSlice({
	name: "crypto",
	initialState,
	reducers: {
		setFavourites: (state, action: PayloadAction<string[]>) => {
			state.favourites = action.payload;
			state.loaded = true;
		},
		setFavLoaded: (state, action) => {
			state.loaded = action.payload;
		},
	},
});

export const { setFavourites, setFavLoaded } = cryptoSlice.actions;
export default cryptoSlice.reducer;

export const selectFavourites = (state: AppState) => state.crypto.favourites;
export const selectFavLoaded = (state: AppState) => state.crypto.loaded;
