import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Container, Link, Text } from "@nextui-org/react";
import {
	getAllPosts,
	getCryptoLatestSentiment,
	LatestSentiment,
	Posts,
} from "@/utility/firestore";
import CryptoChart from "@/components/CryptoChart";
import CryptoTestimonials from "@/components/CryptoTestimonials";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const itemID = params?.crypto as string;
	console.log("ID: " + itemID);
	const foundItem = await getCryptoLatestSentiment(itemID);

	if (!foundItem) {
		return {
			notFound: true,
		};
	}
	const posts = await getAllPosts(itemID);

	return {
		props: {
			cryptoData: foundItem,
			postData: posts,
		},
	};
};

import dynamic from "next/dynamic";
import Head from "next/head";

const DCryptoGauge = dynamic(() => import("@/components/CryptoGauge"), {
	ssr: false,
});

function CryptoPage(props: { cryptoData: LatestSentiment; postData: Posts }) {
	const router = useRouter();

	if (router.isFallback) {
		return <h1>Loading...</h1>;
	}
	return (
		<Container aria-labelledby="cryptocurrency-container">
			<Head aria-labelledby={`${props.cryptoData.id}-metadata`}>
				<title>{props.cryptoData.id}</title>
				<meta
					property={`og:${props.cryptoData.id}`}
					content={props.cryptoData.id}
					key={props.cryptoData.id}
				/>
			</Head>
			<Container css={{ padding: "10px" }}>
				<Text h3>{props.cryptoData.id}</Text>
				<Text h4>Sentiment : {props.cryptoData.latestSentiment}</Text>
				<Container
					aria-labelledby="cryptogauge-container"
					style={{
						float: "left",
						maxHeight: "200px",
						maxWidth: "500px",
					}}
				>
					<DCryptoGauge crypto={props.cryptoData}></DCryptoGauge>
				</Container>

				<Container
					aria-labelledby="testimonials-parent-container"
					display="flex"
					justify="center"
					alignItems="center"
					css={{
						float: "right",
						maxHeight: "600px",
						maxWidth: "30%",
					}}
				>
					<Text h4>
						<Link
							href={`https://www.reddit.com/r/${props.cryptoData.subreddit}/`}
							target="_blank"
						>
							Subreddit
						</Link>
						&nbsp;Testimonials
					</Text>

					<CryptoTestimonials
						posts={props.postData}
					></CryptoTestimonials>
				</Container>
				<Container
					aria-labelledby="historical-data-container"
					css={{
						float: "left",
						maxWidth: "900px",
					}}
				>
					<Text h4>Historical Data</Text>
					<CryptoChart crypto={props.cryptoData}></CryptoChart>
				</Container>
			</Container>
		</Container>
	);
}

export default CryptoPage;
