import {
	createUserWithEmailAndPassword,
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

// import { updatePassword } from "firebase/auth";

// export function updateUserPassword(newPassword: string) {
// 	if (auth.currentUser) {
// 		updatePassword(auth.currentUser, newPassword)
// 			.then(() => {
// 				// Update successful.
// 				console.log("Password update successful");
// 			})
// 			.catch((error) => {
// 				console.log("Password Error occurred");
// 				// An error ocurred
// 				// ...
// 			});
// 	}
// }

// import { sendEmailVerification } from "firebase/auth";

// export function verifyEmail() {
// 	if (auth.currentUser) {
// 		sendEmailVerification(auth.currentUser).then(() => {
// 			// Email verification sent!
// 			// ...
// 			console.log("Email verification sent");
// 		});
// 	}
// }

export async function removeUser() {
	if (auth.currentUser) {
		const user = auth.currentUser;
		await deleteUser(user);
	}
}
