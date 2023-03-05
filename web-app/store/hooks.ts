import { auth } from "@/config/firebase";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setUser } from "./authslice";

import type { AppDispatch, AppState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const listenForAuthChanges = () => {
	return (dispatch: any) => {
		auth.onAuthStateChanged((user) => {
			dispatch(setUser(user));
		});
	};
};
