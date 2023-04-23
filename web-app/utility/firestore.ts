import { firedb } from "@/config/firebase";
import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	query,
	where,
	orderBy,
	updateDoc,
	setDoc,
	deleteDoc,
} from "firebase/firestore";

/**
 * Represents the latest sentiment data for a subreddit.
 *
 * @typedef {Object} LatestSentiment
 * @property {string} id - The ID of the latest sentiment data.
 * @property {number} latestSentiment - The latest sentiment score for the subreddit.
 * @property {string} subreddit - The name of the subreddit.
 */
export type LatestSentiment = {
	id: string;
	latestSentiment: number;
	subreddit: string;
};

/**
 * Represents the sentiment history data for a subreddit.
 *
 * @typedef {Object} SentimentHistory
 * @property {Date} datetime - The date and time when the sentiment was recorded.
 * @property {number} sub_sentiment - The sentiment score for the subreddit at the given date and time.
 */
export type SentimentHistory = {
	datetime: Date;
	sub_sentiment: number;
};

/**
 * Represents a collection of posts.
 *
 * @typedef {Object[]} Posts
 * @property {string} id - The ID of the post.
 * @property {string} datetime - The date and time when the post was created.
 * @property {number} sentiment - The sentiment score for the post.
 * @property {string} title - The title of the post.
 */
export type Posts = {
	[key: string]: any;
	id: string;
	datetime: string;
	sentiment: number;
	title: string;
}[];

/**
 * Deletes a user's data from Firestore.
 *
 * @param {string} userId - The user ID.
 *
 * @returns {Promise<void>} - Promise that resolves when the user's data has been deleted or an error is thrown.
 */
export async function deleteUserData(userId: string): Promise<void> {
	try {
		await deleteDoc(doc(firedb, "users", userId));
	} catch {
		console.log("Unable to delete your data");
	}
}

/**
 * Get the user document from Firestore using the user ID.
 *
 * @param {string} userId - The user ID.
 *
 * @returns {Promise<DocumentData | null>} - Promise that resolves with the user document data, or null if the document does not exist.
 */
async function getUserDocument(userId: string): Promise<DocumentData | null> {
	// Create a reference to the user document with the specified userId.
	const userRef = doc(firedb, "users", userId);
	// Get the user document from Firestore.
	const userDoc = await getDoc(userRef);
	if (userDoc.exists()) {
		// If the document exists, return the document data.
		return userDoc.data();
	} else {
		// If the document does not exist, return null.
		return null;
	}
}

/**
 * Get the user's favourite cryptocurrencies from their user document in Firestore.
 *
 * @param {string} userId - The user ID.
 *
 * @returns {Promise<string[]>} - Promise that resolves with an array of the user's favourite cryptocurrencies, or an empty array if the user document does not exist or does not have a favourites field.
 */
export async function getFavouriteCryptocurrencies(
	userId: string
): Promise<string[]> {
	const userDoc = await getUserDocument(userId);
	return userDoc?.favourites || [];
}

/**
 * Retrieves the latest sentiment data for a specific cryptocurrency from Firestore.
 *
 * @param {string} crypto - The name of the cryptocurrency.
 *
 * @returns {Promise<LatestSentiment | null>} The latest sentiment data for the cryptocurrency, or null if not found.
 */
export async function getCryptoLatestSentiment(
	crypto: string
): Promise<LatestSentiment | null> {
	const docRef = doc(firedb, "sentiments", crypto);

	const snapshot = await getDoc(docRef);

	if (snapshot.exists()) {
		console.log("Document data:", snapshot.data());
		const sentiment: LatestSentiment = {
			id: snapshot.id,
			latestSentiment: snapshot.data().latest_sentiment,
			subreddit: snapshot.data().subreddit,
		};
		return sentiment;
	} else {
		// docSnap.data() will be undefined in this case
		console.log("No such document!");
		return null;
	}
}

/**
 * Retrieves the latest sentiment data for all cryptocurrencies from Firestore.
 *
 * @returns {Promise<LatestSentiment[]>} An array of latest sentiment data for all cryptocurrencies.
 */
export async function getAllLatestSentiments(): Promise<LatestSentiment[]> {
	const sentimentsRef = collection(firedb, "sentiments");

	const snapshot = await getDocs(sentimentsRef);

	const sentiments: LatestSentiment[] = [];

	for (const doc of snapshot.docs) {
		sentiments.push({
			id: doc.id,
			latestSentiment: doc.data().latest_sentiment,
			subreddit: doc.data().subreddit,
		});
	}

	return sentiments;
}

/**
 * Adds a cryptocurrency to a user's list of favourite cryptocurrencies in Firestore.
 *
 * @param {string} email - The user's email.
 * @param {string} cryptocurrency - The name of the cryptocurrency to add.
 *
 * @returns {Promise<void>}
 */
export async function addFavouriteCryptocurrency(
	email: string,
	cryptocurrency: string
): Promise<void> {
	const userRef = doc(firedb, "users", email);
	const userDoc = await getDoc(userRef);

	if (email)
		if (userDoc.exists()) {
			const favourites = userDoc.data().favourites || [];
			if (favourites.includes(cryptocurrency)) {
				return;
			}

			const updatedFavourites = [...favourites, cryptocurrency];

			await updateDoc(userRef, { favourites: updatedFavourites });
		} else {
			console.log("No document but adding");
			await setDoc(userRef, { favourites: [cryptocurrency] });
		}
}

/**
 * Removes a cryptocurrency from a user's list of favourite cryptocurrencies in Firestore.
 *
 * @param {string} email - The user's email.
 * @param {string} cryptocurrency - The name of the cryptocurrency to remove.
 *
 * @returns {Promise<void>}
 */
export async function removeFavouriteCryptocurrency(
	email: string,
	cryptocurrency: string
): Promise<void> {
	const userRef = doc(firedb, "users", email);
	const userDoc = await getDoc(userRef);

	if (userDoc.exists()) {
		// If the document exists, update favourites array
		const favourites = userDoc.data().favourites || [];
		if (!favourites.includes(cryptocurrency)) {
			// If the cryptocurrency is not in the list, return
			return;
		}

		const updatedFavourites = favourites.filter(
			(fav: string) => fav !== cryptocurrency
		);

		await updateDoc(userRef, { favourites: updatedFavourites });
	} else {
		// If the document does not exist, return an empty favourites array
		console.log("No account but removing");
		await setDoc(userRef, { favourites: [] });
	}
}

/**
 * Retrieves the sentiment history for a given cryptocurrency in a specified time range.
 *
 * @param {string} crypto - The cryptocurrency symbol.
 * @param {Date} startTime - The start time of the time range.
 * @param {Date} endTime - The end time of the time range.
 *
 * @returns {Promise<SentimentHistory[]>} An array of sentiment history objects.
 */
export async function getSentimentHistoryInRange(
	crypto: string,
	startTime: Date,
	endTime: Date
): Promise<SentimentHistory[]> {
	const historyRef = collection(firedb, `sentiments/${crypto}/history`);
	const sentimentQuery = query(
		historyRef,
		where("datetime", ">=", startTime),
		where("datetime", "<=", endTime),
		orderBy("datetime", "asc")
	);
	const snapshot = await getDocs(sentimentQuery);

	const history: SentimentHistory[] = [];
	snapshot.forEach((doc) => {
		const datetime: Date = doc.data().datetime.toDate();

		history.push({
			datetime: datetime,
			sub_sentiment: doc.data().sub_sentiment,
		});
	});
	return history;
}

/**
 * Retrieves all posts related to a given cryptocurrency sorted by descending datetime.
 *
 * @param {string} crypto - The cryptocurrency symbol.
 *
 * @returns {Promise<Posts>} An array of posts objects.
 */
export async function getAllPosts(crypto: string): Promise<Posts> {
	const historyRef = collection(firedb, `sentiments/${crypto}/posts`);
	const sentimentQuery = query(historyRef, orderBy("datetime", "desc"));
	const snapshot = await getDocs(sentimentQuery);

	const posts: Posts = [];
	snapshot.forEach((doc) => {
		const datetime: Date = doc.data().datetime.toDate();
		const formDatetime = datetime.toISOString();
		posts.push({
			id: doc.id,
			datetime: formDatetime,
			sentiment: doc.data().sentiment,
			title: doc.data().title,
		});
	});
	return posts;
}
