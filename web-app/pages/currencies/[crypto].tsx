// UPDATE CODE TO MAKE USE OF THE DATA FROM FIRESTORE
import { firedb } from "@/config/firebase";
import { addDoc, collection, doc } from "firebase/firestore";

import {
	GetStaticProps,
	GetStaticPaths,
	GetServerSideProps,
	NextPageContext,
	GetServerSidePropsContext,
} from "next";
import { useRouter } from "next/router";
import { Container, Text, Spacer, Textarea } from "@nextui-org/react";
import {
	generateFakeHistoricalData,
	getAllLatestSentiments,
	getSentimentHistoryInRange,
	LatestSentiment,
} from "@/utility/firestore";
import CryptoChart from "@/components/CryptoChart";
import { faker } from "@faker-js/faker";
import CryptoTestimonials from "@/components/CryptoTestimonials";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const itemID = params?.crypto as string;

	// generateFakeHistoricalData();
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

function CryptoPage(props: { specificCryptoData: LatestSentiment }) {
	const router = useRouter();

	if (router.isFallback) {
		return <h1>Loading...</h1>;
	}
	return (
		<Container fluid alignItems="center" justify="space-between">
			<Text h3>{props.specificCryptoData.id}</Text>
			<Text h4>
				Sentiment : {props.specificCryptoData.latestSentiment}
			</Text>

			<Text h4>Testimonials</Text>
			<CryptoTestimonials
				crypto={props.specificCryptoData}
			></CryptoTestimonials>
			<Spacer y={0.5} />
			<Textarea
				readOnly
				initialValue="Almost before we knew it, we had left the ground."
			/>

			<Text h4>Historical Data</Text>
			{/* <CryptoChart crypto={props.specificCryptoData}></CryptoChart> */}
		</Container>
	);
}

export default CryptoPage;
