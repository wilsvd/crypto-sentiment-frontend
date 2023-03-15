import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
	updateEmail,
	deleteUser,
	signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";

export async function makeAccount(email: string, password: string) {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user ? true : false;
	} catch {
		return false;
	}
}

export async function signOutAccount() {
	signOut(auth)
		.then(() => {
			console.log("Sign out successful");
		})
		.catch((error) => {
			console.log("Signing out error");
			console.log(error);
		});
}

export async function signInAccount(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		// Signed in
		return userCredential.user ? true : false;
	} catch {
		return false;
	}
}

export function updateUserProfile(newProfile: {
	displayName: string;
	photoURL: string;
}) {
	if (auth.currentUser) {
		updateProfile(auth.currentUser, newProfile)
			.then(() => {
				// Profile updated!
				// ...
			})
			.catch((error) => {
				// An error occurred
				// ...
			});
	}
}

export function updateEmailAddress(newEmail: string) {
	console.log("Trying to update");
	if (auth.currentUser) {
		updateEmail(auth.currentUser, newEmail)
			.then(() => {
				console.log("Email updated!");
				// Email updated!
				// ...
			})
			.catch((error) => {
				console.log(error);
				// An error occurred
				// ...
			});
	}
}

import { updatePassword } from "firebase/auth";

export function updateUserPassword(newPassword: string) {
	if (auth.currentUser) {
		updatePassword(auth.currentUser, newPassword)
			.then(() => {
				// Update successful.
				console.log("Password update successful");
			})
			.catch((error) => {
				console.log("Password Error occurred");
				// An error ocurred
				// ...
			});
	}
}

import { sendEmailVerification } from "firebase/auth";

export function verifyEmail() {
	if (auth.currentUser) {
		sendEmailVerification(auth.currentUser).then(() => {
			// Email verification sent!
			// ...
			console.log("Email verification sent");
		});
	}
}

import { sendPasswordResetEmail } from "firebase/auth";

export function resetPassword(email: string) {
	sendPasswordResetEmail(auth, email)
		.then(() => {
			console.log("Password reset email sent");
			// Password reset email sent!
			// ..
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
}

export async function removeUser() {
	if (auth.currentUser) {
		const user = auth.currentUser;
		await deleteUser(user);
	}
}
