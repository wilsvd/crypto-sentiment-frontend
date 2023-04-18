import { GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});
