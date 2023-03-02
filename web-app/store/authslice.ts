import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
	isActive: boolean;
	displayName: string;
	email: string;
	phoneNumber: string;
	emailVerified: boolean;
	photoURL: string;
	favouriteCoins: [];
}

// Initial state
const initialState: AuthState = {
	isActive: false,
	displayName: "",
	email: "",
	phoneNumber: "",
	emailVerified: false,
	photoURL: "",
	favouriteCoins: [],
};

// Actual Slice
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Action to set the authentication status
		setisActive(state, action) {
			state.isActive = action.payload;
		},
		setDisplayName(state, action) {
			state.displayName = action.payload;
		},
		setEmail(state, action) {
			state.email = action.payload;
		},
		setPhoneNumber(state, action) {
			state.phoneNumber = action.payload;
		},
		setEmailVerified(state, action) {
			state.emailVerified = action.payload;
		},
		setPhotoURL(state, action) {
			state.photoURL = action.payload;
		},
		setFavouriteCoins(state, action) {
			state.favouriteCoins = action.payload;
		},
	},

	// Special reducer for hydrating the state. Special case for next-redux-wrapper
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.auth,
			};
		},
	},
});

export const {
	setisActive,
	setDisplayName,
	setEmail,
	setPhoneNumber,
	setEmailVerified,
	setPhotoURL,
	setFavouriteCoins,
} = authSlice.actions;

export const selectisActive = (state: AppState) => state.auth.isActive;
export const selectDisplayName = (state: AppState) => state.auth.displayName;
export const selectEmail = (state: AppState) => state.auth.email;
export const selectPhoneNumber = (state: AppState) => state.auth.phoneNumber;
export const selectEmailVerified = (state: AppState) =>
	state.auth.emailVerified;
export const selectPhotoURL = (state: AppState) => state.auth.photoURL;
export const selectFavouriteCoins = (state: AppState) =>
	state.auth.favouriteCoins;

export default authSlice.reducer;
