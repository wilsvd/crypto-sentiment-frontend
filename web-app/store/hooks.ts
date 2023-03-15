import { auth } from "@/config/firebase";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setUser, User } from "./authslice";

import type { AppDispatch, AppState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const listenForAuthChanges = () => {
	return (dispatch: any) => {
		auth.onAuthStateChanged((user) => {
			console.log("AUTH CHANGING");
			if (user) {
				const userDetails: User = {
					displayName: user.displayName,
					email: user.email,
					emailVerified: user.emailVerified,
					phoneNumber: user.phoneNumber,
				};
				dispatch(setUser(userDetails));
			} else {
				dispatch(setUser(null));
			}
		});
	};
};
