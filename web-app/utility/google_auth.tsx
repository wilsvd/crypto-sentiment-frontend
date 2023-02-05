import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebase";

const provider = new GoogleAuthProvider();

export function signInGoogle() {
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			if (credential) {
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				console.log("Great success");
			}
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorMessage);
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
			console.log("Oh No");
		});
}

import { signInWithRedirect } from "firebase/auth";
export function signInGoogleRedirect() {
	signInWithRedirect(auth, provider);
}
