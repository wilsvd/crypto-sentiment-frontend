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
	addDoc,
	deleteDoc,
} from "firebase/firestore";

export type LatestSentiment = {
	id: string;
	latestSentiment: number;
};

export type SentimentHistory = {
	datetime: string;
	sub_sentiment: number;
};

export type Posts = {
	[key: string]: any;
	id: string;
	datetime: string;
	sentiment: number;
	title: string;
}[];

export async function deleteUserData(userId: string) {
	try {
		await deleteDoc(doc(firedb, "users", userId));
	} catch {
		console.log("Unable to delete your data");
	}
}

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

export async function getCryptoLatestSentiment(
	crypto: string
): Promise<LatestSentiment | null> {
	console.log("cryptos: " + crypto);

	try {
		const sentimentsRef = collection(
			firedb,
			`sentiments/${crypto}/history`
		);
		const filteredSentimentsRef = query(
			sentimentsRef,
			orderBy("datetime", "desc"),
			limit(1)
		);
		var sentiment: LatestSentiment | null = null;
		try {
			const snapshot = await getDocs(filteredSentimentsRef);

			if (snapshot.docs.length > 0) {
				const latest = snapshot.docs[0].data();
				sentiment = {
					id: crypto,
					latestSentiment: latest.sub_sentiment,
				};
			}

			return sentiment;
		} catch (error) {
			console.log(error);
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getAllLatestSentiments(): Promise<LatestSentiment[]> {
	const sentimentsRef = collection(firedb, "sentiments");

	const snapshot = await getDocs(sentimentsRef);

	const sentiments: LatestSentiment[] = [];

	for (const doc of snapshot.docs) {
		sentiments.push({
			id: doc.id,
			latestSentiment: doc.data().latest_sentiment,
		});
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
			const info = latestSentimentDoc.data();
			sentiments.push({
				id: doc.id,
				latestSentiment: info.sub_sentiment,
				datetime: info.datetime,
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

export async function getSentimentHistoryInRange(
	crypto: string,
	startTime: Date,
	endTime: Date
): Promise<SentimentHistory[]> {
	const historyRef = collection(firedb, `sentiments/${crypto}/history`);
	const sentimentQuery = query(
		historyRef,
		where("datetime", ">=", startTime),
		where("datetime", "<=", endTime)
	);
	const snapshot = await getDocs(sentimentQuery);

	const history: SentimentHistory[] = [];
	snapshot.forEach((doc) => {
		const datetime: Date = doc.data().datetime.toDate();
		const formDatetime = datetime.toISOString();
		history.push({
			datetime: formDatetime,
			sub_sentiment: doc.data().sub_sentiment,
		});
	});
	return history;
}

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
