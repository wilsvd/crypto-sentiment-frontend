const SERVICE_ACCOUNT = {
	type: process.env.NEXT_PUBLIC_FIREBASE_TYPE,
	project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
	private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
	client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
	client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
	auth_uri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
	token_uri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url:
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_X509_CERT_URL,
	client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL,
};
// Initialize Firebase
var admin = require("firebase-admin");

try {
	admin.initializeApp({
		credential: admin.credential.cert(SERVICE_ACCOUNT),
		databaseURL:
			"https://crypto-sentiment-backend-default-rtdb.europe-west1.firebasedatabase.app",
	});
	console.log("Initialized.");
} catch (error: any) {
	if (!/already exists/u.test(error.message)) {
		console.error("Firebase admin initialization error", error.stack);
	}
}

export default admin;
