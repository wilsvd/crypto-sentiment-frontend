// UPDATE CODE TO MAKE USE OF THE DATA FROM FIRESTORE

import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import CryptoCoin from "@/components/CryptoCoin";
import { Container } from "@nextui-org/react";
import { getAllLatestSentiments, LatestSentiment } from "@/utility/firestore";

export const getStaticProps: GetStaticProps = async (context) => {
	const itemID = context.params?.crypto;
	const sentiments = await getAllLatestSentiments();

	const foundItem = sentiments.find(
		(item: LatestSentiment) => itemID === item.id
	);
	return {
		props: {
			specificCryptoData: foundItem,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const sentiments = await getAllLatestSentiments();

	const pathsWithParams = sentiments.map((crypto: LatestSentiment) => {
		return {
			params: { crypto: crypto.id },
		};
	});

	return {
		paths: pathsWithParams,
		fallback: false,
	};
};

function CryptoPage(props: { specificCryptoData: any; hasError: boolean }) {
	const router = useRouter();

	console.log(props.specificCryptoData);
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

export default CryptoPage;
