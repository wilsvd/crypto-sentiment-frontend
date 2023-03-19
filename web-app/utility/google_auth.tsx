import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "@/config/firebase";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export async function signInGoogle() {
	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		return credential ? true : false;
	} catch {
		console.log("Uncaught error");
	}
}
