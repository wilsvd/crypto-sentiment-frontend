import { GoogleAuthProvider } from "firebase/auth";

/**
 * A pre-configured instance of GoogleAuthProvider for Firebase Authentication.
 * @public
 */
export const provider = new GoogleAuthProvider();

/**
 * Custom parameters to configure the behavior of the Google sign-in flow.
 * @remarks
 * This parameter is optional, and when provided it will override the default behavior of Firebase Authentication.
 * In this case, the "prompt" parameter is set to "select_account", which prompts the user to select an account
 * when they sign in with Google.
 */
provider.setCustomParameters({
	prompt: "select_account",
});
