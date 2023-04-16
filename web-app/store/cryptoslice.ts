import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

export type cryptoDataT = {
	key: string;
	cryptocurrency: string;
	sentiment: string;
	favourite: boolean;
};

interface CryptoState {
	data: cryptoDataT[];
	loaded: boolean;
}

export const initialState: CryptoState = {
	data: [],
	loaded: false,
};

export const cryptoSlice = createSlice({
	name: "cryptodata",
	initialState,
	reducers: {
		setCryptoData: (state, action: PayloadAction<cryptoDataT[]>) => {
			state.data = action.payload;
			state.loaded = true;
		},
		setCryptoLoaded: (state, action) => {
			state.loaded = action.payload;
		},
	},
});

export const { setCryptoData, setCryptoLoaded } = cryptoSlice.actions;
export default cryptoSlice.reducer;

export const selectCryptoData = (state: AppState) => state.cryptoData.data;
export const selectCryptoLoaded = (state: AppState) => state.cryptoData.loaded;
