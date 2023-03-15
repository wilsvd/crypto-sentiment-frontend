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
	datetime: string;
	sentiment: number;
	title: string;
}[];

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
	const sentimentsRef = collection(firedb, `sentiments/${crypto}/history`);
	const filteredSentimentsRef = query(
		sentimentsRef,
		orderBy("datetime", "desc"),
		limit(1)
	);
	const snapshot = await getDocs(filteredSentimentsRef);

	var sentiment: LatestSentiment = {
		id: "",
		latestSentiment: 0,
	};
	if (snapshot.docs.length > 0) {
		const latest = snapshot.docs[0].data();
		sentiment = {
			id: crypto,
			latestSentiment: latest.sub_sentiment,
		};
	}

	return sentiment ? sentiment : null;
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
			datetime: formDatetime,
			sentiment: doc.data().sentiment,
			title: doc.data().title,
		});
	});
	return posts;
}

// export async function generateFakeHistoricalData() {
// 	const nEndTime = new Date();
// 	const nStartTime = new Date("2023-01-01T00:30:00Z");

// 	const crypto = "0xPolygon";
// 	async function printDates(startDate: Date, endDate: Date) {
// 		let currentDate = startDate;
// 		while (currentDate <= endDate) {
// 			console.log(currentDate);
// 			const sentiment = faker.datatype.number({
// 				min: -1,
// 				max: 1,
// 				precision: 0.01,
// 			});
// 			const ref = collection(firedb, `sentiments/${crypto}/history`);
// 			const res = await addDoc(ref, {
// 				datetime: currentDate,
// 				sub_sentiment: sentiment,
// 			});
// 			currentDate.setDate(currentDate.getDate() + 1);
// 		}
// 	}
// 	printDates(nStartTime, nEndTime);
// }
