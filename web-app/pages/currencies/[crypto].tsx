// UPDATE CODE TO MAKE USE OF THE DATA FROM FIRESTORE
import { firedb } from "@/config/firebase";
import { addDoc, collection, doc } from "firebase/firestore";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Container, Text } from "@nextui-org/react";
import { getAllLatestSentiments, LatestSentiment } from "@/utility/firestore";
import CryptoChart from "@/components/CryptoChart";
import CryptoTestimonials from "@/components/CryptoTestimonials";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	// const itemID = params?.crypto as string;

	// const sentiments = await getAllLatestSentiments();
	// const foundItem = sentiments.find(
	// 	(item: LatestSentiment) => itemID === item.id
	// );

	// console.log(foundItem);
	return {
		props: {
			specificCryptoData: { id: "0xPolygon", latestSentiment: 0.97 },
		},
	};
};

import dynamic from "next/dynamic";

const DCryptoGauge = dynamic(() => import("@/components/CryptoGauge"), {
	ssr: false,
});

function CryptoPage(props: { specificCryptoData: LatestSentiment }) {
	const router = useRouter();

	if (router.isFallback) {
		return <h1>Loading...</h1>;
	}
	return (
		<Container>
			<Text h3>{props.specificCryptoData.id}</Text>
			<Text h4>
				Sentiment : {props.specificCryptoData.latestSentiment}
			</Text>
			<Container
				style={{ float: "left", maxHeight: "200px", maxWidth: "500px" }}
			>
				<DCryptoGauge crypto={props.specificCryptoData}></DCryptoGauge>
			</Container>

			<Container
				display="flex"
				justify="center"
				alignItems="center"
				css={{
					float: "right",
					maxHeight: "600px",
					maxWidth: "30%",
				}}
			>
				<Text h4>Testimonials</Text>

				<CryptoTestimonials
					crypto={props.specificCryptoData}
				></CryptoTestimonials>
			</Container>
			<Container
				css={{
					float: "left",
					maxWidth: "900px",
				}}
			>
				<Text h4>Historical Data</Text>
				<CryptoChart crypto={props.specificCryptoData}></CryptoChart>
			</Container>
		</Container>
	);
}

export default CryptoPage;
