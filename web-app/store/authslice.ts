// The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0.
// Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { User } from "firebase/auth";

// Type for our state
export interface AuthState {
	user: User | null;
	value: number;
}

// Initial state
const initialState: AuthState = {
	user: null,
	value: 0,
};

// Actual Slice
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Action to set the authentication status
		setUser(state, action) {
			state.user = action.payload;
		},
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
});

export const { setUser, increment, decrement, incrementByAmount } =
	authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: AppState) => state.auth.user;
export const selectCount = (state: AppState) => state.auth.value;
