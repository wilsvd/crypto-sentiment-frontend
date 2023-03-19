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

export const userCryptoSlice = createSlice({
	name: "usercrypto",
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

export const { setFavourites, setFavLoaded } = userCryptoSlice.actions;
export default userCryptoSlice.reducer;

export const selectFavourites = (state: AppState) =>
	state.userCrypto.favourites;
export const selectFavLoaded = (state: AppState) => state.userCrypto.loaded;
