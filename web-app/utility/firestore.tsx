import { firedb } from "@/config/firebase";
import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	query,
	where,
	QueryDocumentSnapshot,
	QuerySnapshot,
	orderBy,
	limit,
	updateDoc,
	setDoc,
} from "firebase/firestore";

async function getUserDocument(userId: string): Promise<DocumentData | null> {
	const userRef = doc(firedb, "users", userId);
	const userDoc = await getDoc(userRef);
	if (userDoc.exists()) {
		return userDoc.data();
	} else {
		return null;
	}
}

export async function getFavouriteCryptocurrencies(
	userId: string
): Promise<string[]> {
	const userDoc = await getUserDocument(userId);
	return userDoc?.favourites || [];
}

export async function getAllSentimentHistory() {
	const sentimentsRef = collection(firedb, "sentiments");
	const sentimentsSnapshot = await getDocs(sentimentsRef);
	const historyPromises = sentimentsSnapshot.docs.map(async (doc) => {
		const historyRef = collection(doc.ref, "history");
		const historySnapshot = await getDocs(historyRef);
		return historySnapshot.docs.map((doc) => doc.data());
	});
	const history = await Promise.all(historyPromises);
	return history;
}

export interface LatestSentiment {
	id: string;
	latestSentiment: number;
}

export async function getAllLatestSentiments(): Promise<LatestSentiment[]> {
	const sentimentsRef = collection(firedb, "sentiments");

	const snapshot = await getDocs(sentimentsRef);

	const sentiments: LatestSentiment[] = [];

	for (const doc of snapshot.docs) {
		const latestSentimentRef = collection(doc.ref, "history");
		const latestSentimentQuery = query(
			latestSentimentRef,
			orderBy("datetime", "desc"),
			limit(1)
		);

		const latestSentimentSnapshot = await getDocs(latestSentimentQuery);

		if (latestSentimentSnapshot.docs.length > 0) {
			const latestSentimentDoc = latestSentimentSnapshot.docs[0];
			sentiments.push({
				id: doc.id,
				latestSentiment: latestSentimentDoc.data().sub_sentiment,
			});
		}
	}

	return sentiments;
}

export async function getFavouriteLatestSentiments(
	favouriteCryptos: string[]
): Promise<LatestSentiment[]> {
	if (!favouriteCryptos || favouriteCryptos.length == 0) {
		return [];
	}
	console.log("Favourite cryptos" + favouriteCryptos);
	const sentimentsRef = collection(firedb, "sentiments");
	const filteredSentimentsRef = query(
		sentimentsRef,
		where("crypto", "in", favouriteCryptos)
	);
	console.log(filteredSentimentsRef);
	const snapshot = await getDocs(filteredSentimentsRef);
	const sentiments = [];

	for (const doc of snapshot.docs) {
		const latestSentimentRef = collection(doc.ref, "history");
		const latestSentimentQuery = query(
			latestSentimentRef,
			orderBy("datetime", "desc"),
			limit(1)
		);

		const latestSentimentSnapshot = await getDocs(latestSentimentQuery);

		if (latestSentimentSnapshot.docs.length > 0) {
			const latestSentimentDoc = latestSentimentSnapshot.docs[0];
			sentiments.push({
				id: doc.id,
				latestSentiment: latestSentimentDoc.data().sub_sentiment,
			});
		}
	}

	return sentiments;
}

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

export async function removeFavouriteCryptocurrency(
	email: string,
	cryptocurrency: string
): Promise<void> {
	const userRef = doc(firedb, "users", email);
	const userDoc = await getDoc(userRef);

	if (userDoc.exists()) {
		const favourites = userDoc.data().favourites || [];
		if (!favourites.includes(cryptocurrency)) {
			return;
		}

		const updatedFavourites = favourites.filter(
			(fav: string) => fav !== cryptocurrency
		);

		await updateDoc(userRef, { favourites: updatedFavourites });
	} else {
		console.log("No account but removing");
		await setDoc(userRef, { favourites: [] });
	}
}
