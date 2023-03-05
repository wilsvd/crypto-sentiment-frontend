// UPDATE CODE TO MAKE USE OF THE DATA FROM FIRESTORE

import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import CryptoCoin from "@/components/CryptoCoin";
import { Container } from "@nextui-org/react";

interface cryptoInterface {
	key: string;
	cryptocurrency: string;
	sentiment: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
	// const itemID = context.params?.crypto;
	// const response = await fetch("http://localhost:3000/api/tryFirebaseadmin");
	// const res = await response.json();
	// let data = res["data"];

	// let cryptocurrencies = Object.keys(data);

	// let table = cryptocurrencies.map((crypto) => {
	// 	var sentimentVal: string = data[crypto]["sentiment"];
	// 	return {
	// 		key: crypto,
	// 		cryptocurrency: crypto,
	// 		sentiment: sentimentVal,
	// 	};
	// });
	// const foundItem = table.find(
	// 	(item: cryptoInterface) => itemID === item.key
	// );

	// if (!foundItem) {

	return {
		props: { hasError: true },
	};
	// }

	// return {
	// 	props: {
	// 		specificCryptoData: foundItem,
	// 	},
	// };
};

export const getStaticPaths: GetStaticPaths = async () => {
	// const response = await fetch("http://localhost:3000/api/tryFirebaseadmin");

	// const res = await response.json();
	// let data1 = res["data"];

	// let cryptocurrencies = Object.keys(data1);

	// let table = cryptocurrencies.map((crypto) => {
	// 	var sentimentVal: string = data1[crypto]["sentiment"];
	// 	return {
	// 		key: crypto,
	// 		cryptocurrency: crypto,
	// 		sentiment: sentimentVal,
	// 	};
	// });

	// const pathsWithParams = table.map((crypto: cryptoInterface) => ({
	// 	params: { crypto: crypto.key },
	// }));

	return {
		paths: [],
		fallback: false,
	};
};

function projectPage(props: {
	specificCryptoData: cryptoInterface;
	hasError: boolean;
}) {
	const router = useRouter();

	if (props.hasError) {
		return <h1>Error - please try another parameter</h1>;
	}

	if (router.isFallback) {
		return <h1>Loading...</h1>;
	}

	return (
		<Container>
			<CryptoCoin
				specificCryptoData={props.specificCryptoData}
				hasError={props.hasError}
			/>
		</Container>
	);
}

export default projectPage;
