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
		// Signed in
		const user = userCredential.user;
		// ...
		console.log("You successfuly made an account");
		return true;
	} catch (error) {
		console.log("Make account error");
		console.log(error);
		return false;
	}
}

export function signOutAccount() {
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
		const user = userCredential.user;
		// ...
		console.log("You successfully signed in");
		return true;
	} catch (error) {
		console.log("Sign in error");

		console.log(error);
		return false;
	}
}

export function accountObserver() {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			user.displayName;
			user.phoneNumber;
			user.email;
			user.emailVerified;
			user.photoURL;

			user.providerData.forEach((profile) => {
				console.log("  Sign-in provider: " + profile.providerId);
				console.log("  Provider-specific UID: " + profile.uid);
				console.log("  Name: " + profile.displayName);
				console.log("  Email: " + profile.email);
				console.log("  Email: " + profile.phoneNumber);
			});
			// ...
		} else {
			console.log("Signed out");
			// User is signed out
			// ...
		}
	});
}

export function updateUserProfile() {
	if (auth.currentUser) {
		updateProfile(auth.currentUser, {
			displayName: "Wil",
		})
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
	if (auth.currentUser) {
		updateEmail(auth.currentUser, newEmail)
			.then(() => {
				console.log("Email updated!");
				// Email updated!
				// ...
			})
			.catch((error) => {
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

export function removeUser() {
	if (auth.currentUser) {
		const user = auth.currentUser;
		deleteUser(user)
			.then(() => {
				// User deleted.
			})
			.catch((error) => {
				// An error ocurred
				// ...
			});
	}
}
