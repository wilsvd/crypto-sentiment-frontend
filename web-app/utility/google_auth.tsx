import {
	signInWithPopup,
	GoogleAuthProvider,
	signInWithRedirect,
} from "firebase/auth";

import { auth } from "@/config/firebase";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export function signInGoogle() {
	console.log("Sign in");
	signInWithPopup(auth, provider)
		.then((result) => {
			console.log("Hey");
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			console.log(credential);
			if (credential) {
				// The signed-in user info.
				console.log("Great success");
			}
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			console.log(error);
			// ...
			console.log("Oh No");
		});
}

export function signInGoogleRedirect() {
	signInWithRedirect(auth, provider);
}
