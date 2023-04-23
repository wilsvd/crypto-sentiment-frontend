import {
	configureStore,
	ThunkAction,
	Action,
	EnhancedStore,
	Dispatch,
} from "@reduxjs/toolkit";
import authReducer from "./authslice";
import userCryptoSlice from "./usercryptoslice";
import cryptoSlice from "./cryptoslice";

/**
 * Configures and returns a new Redux store with three reducers.
 * @function makeStore
 * @returns A new Redux store.
 */
export function makeStore() {
	return configureStore({
		reducer: {
			auth: authReducer,
			userCrypto: userCryptoSlice,
			cryptoData: cryptoSlice,
		},
	});
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
