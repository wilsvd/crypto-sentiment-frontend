import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

/**
 * User object containing user information.
 * @typedef {Object} User - A new type named 'User'.
 * @property {string | null} displayName - The display name of the user.
 * @property {string | null} email - The email address of the user.
 * @property {boolean | null} emailVerified - Indicates if the email has been verified or not.
 * @property {string | null} phoneNumber - The phone number of the user.
 */
export type User = {
	displayName: string | null;
	email: string | null;
	emailVerified: boolean | null;
	phoneNumber: string | null;
};

/**
 * AuthState interface contains the user information, loading and error status.
 * @interface AuthState - A new interface named 'AuthState'
 * @property {User | null} user - The user information.
 * @property {boolean} loading - The loading status of the page.
 * @property {string | null} error - The error message.
 */
interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
}

/**
 * The initial state of the auth slice.
 *
 * @type {AuthState}
 */
const initialState: AuthState = {
	user: null,
	loading: true,
	error: null,
};

/**
 * A slice of the Redux store that handles the authentication data state.
 */
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		/**
		 * Sets the user information and loading and error status to the provided values.
		 *
		 * @function setUser
		 * @param {AuthState} state - The state of the auth slice.
		 * @param {PayloadAction<User | null>} action - The user information to be set.
		 */
		setUser: (state: AuthState, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		/**
		 * Sets the loading status to true.
		 *
		 * @function setLoading
		 * @param {AuthState} state - The state of the auth slice.
		 */
		setLoading: (state: AuthState) => {
			state.loading = true;
		},
		/**
		 * Sets the error status to the provided value and the loading status to false.
		 *
		 * @function setError
		 * @param {AuthState} state - The state of the auth slice.
		 * @param {PayloadAction<string>} action - The error message to be set.
		 */
		setError: (state: AuthState, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

/**
 * Export the reducers as actions.
 *
 * @exports setUser - The setUser reducer as an action.
 */
export const { setUser } = authSlice.actions;
export default authSlice.reducer;

/**
 * Selector function that returns the user information from the auth slice of the Redux store.
 *
 * @function selectUser
 * @param {AppState} state - The state of the Redux store.
 * @returns {User | null} The user information.
 */
export const selectUser = (state: AppState) => state.auth.user;
