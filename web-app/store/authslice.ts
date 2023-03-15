import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

export type User = {
	displayName: string | null;
	email: string | null;
	emailVerified: boolean | null;
	phoneNumber: string | null;
};

interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	loading: true,
	error: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		setLoading: (state) => {
			state.loading = true;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: AppState) => state.auth.user;
