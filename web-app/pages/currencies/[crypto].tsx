import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import React, { useState } from "react";

import { CSS, Container, Grid, Spacer, Text } from "@nextui-org/react";
import {
	getAllPosts,
	getCryptoLatestSentiment,
	LatestSentiment,
	Posts,
} from "@/utility/firestore";
import CryptoChart from "@/components/cryptodata/CryptoChart";
import CryptoTestimonials from "@/components/cryptodata/CryptoTestimonials";

import useMediaQuery, {
	MediaBreakpoints,
	useAppDispatch,
	useAppSelector,
} from "@/store/hooks";
import { selectCryptoData } from "@/store/cryptoslice";
import { selectFavourites } from "@/store/usercryptoslice";
import { selectUser } from "@/store/authslice";
import { toggleFavorite } from "@/utility/favouriting";

/**
 * Fetches the latest sentiment data and posts data for a specific cryptocurrency from Firestore.
 * Returns `notFound: true` if the cryptocurrency is not found.
 * @param params - Object containing the ID of the cryptocurrency.
 * @returns {Promise<GetServerSidePropsResult<{ [key: string]: any; }>>} Object containing the fetched latest sentiment data and posts data.
 */
export const getServerSideProps: GetServerSideProps = async ({
	params,
}): Promise<GetServerSidePropsResult<{ [key: string]: any }>> => {
	const itemID = params?.crypto as string;
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

const DCryptoGauge = dynamic(
	() => import("@/components/cryptodata/CryptoGauge"),
	{
		ssr: false,
	}
);

/**
CryptoPageProps type defines the props for the CryptoPage component.

@typedef {Object} - A new type named 'CryptoPageProps'.
@property {LatestSentiment} cryptoData - Latest sentiment data of the cryptocurrency.
@property {Posts} postData - Post data related to the cryptocurrency.
*/
type CryptoPageProps = {
	cryptoData: LatestSentiment;
	postData: Posts;
};

/**
 * CryptoPage component is a page that displays the sentiment data and related posts for a cryptocurrency.
 *
 * @param {CryptoPageProps} props - Props for the CryptoPage component.
 * @returns {JSX.Element} - Rendered CryptoPage component.
 */
export default function CryptoPage({
	cryptoData,
	postData,
}: CryptoPageProps): JSX.Element {
	// Checks if the screen width is less than or equal to MediaBreakpoints.sm
	const isSmallScreen = useMediaQuery(`(max-width: ${MediaBreakpoints.sm})`);
	// Checks if the screen width is less than or equal to 412 pixels
	const isTinyScreen = useMediaQuery(`(max-width: ${412})`);

	// Selects the user from the Redux store
	const user = useAppSelector(selectUser);
	// Selects the full cryptocurrency data from the Redux store
	const fullData = useAppSelector(selectCryptoData);
	// Selects the user's favorite cryptocurrencies from the Redux store
	const userFavourites = useAppSelector(selectFavourites);

	const dispatch = useAppDispatch();

	// Determines whether the cryptocurrency is a favorite of the user
	const [isFavourite, setIsFavourite] = useState<boolean>(
		userFavourites.includes(cryptoData.id)
	);

	const router = useRouter();

	// CSS styles to be applied when the screen width is less than or equal to 412 pixels
	const tinyStyle: CSS = isTinyScreen
		? { padding: "10px", overflowX: "auto" }
		: { padding: "10px" };

	// Returns a loading screen when the data is still being fetched
	if (router.isFallback) {
		return <h1>Loading...</h1>;
	}

	// Returns the rendered CryptoPage component
	return (
		<Container fluid aria-labelledby="cryptocurrency-container">
			<Head aria-labelledby={`${cryptoData.id}-metadata`}>
				<title>{cryptoData.id}</title>
				<meta
					property={`og:${cryptoData.id}`}
					content={cryptoData.id}
					key={cryptoData.id}
				/>
			</Head>
			<Container fluid css={tinyStyle}>
				{/* Displays the cryptocurrency name and a favorite icon */}
				<div style={{ display: "flex", alignItems: "center" }}>
					<Text h2>{cryptoData.id}</Text>
					<Spacer x={0.5}></Spacer>
					{isFavourite ? (
						<Image
							data-testid="favourite-image"
							style={{ cursor: "pointer" }}
							aria-labelledby="dashboard-table-favourite"
							src="/red-heart-icon.svg"
							alt="me"
							onClick={() =>
								toggleFavorite(
									user,
									fullData,
									userFavourites,
									cryptoData.id,
									dispatch,
									setIsFavourite
								)
							}
							width={28}
							height={28}
						/>
					) : (
						<Image
							data-testid="unfavourite-image"
							sizes=""
							style={{ cursor: "pointer" }}
							aria-labelledby="dashboard-table-unfavourite"
							src="/iconmonstr-heart-thin.svg"
							alt="me"
							onClick={() =>
								toggleFavorite(
									user,
									fullData,
									userFavourites,
									cryptoData.id,
									dispatch,
									setIsFavourite
								)
							}
							width={28}
							height={28}
						/>
					)}
				</div>

				{isSmallScreen ? (
					<SmallScreenContainer
						cryptoData={cryptoData}
						postData={postData}
						isTinyScreen={isTinyScreen}
					/>
				) : (
					<BigScreenContainer
						cryptoData={cryptoData}
						postData={postData}
					/>
				)}
			</Container>
		</Container>
	);
}

/**
 * SmallScreenContainer component renders a container of components for small screens.
 *
 * @param {Object} props - The props object of the component.
 * @param {LatestSentiment} props.cryptoData - Latest sentiment data of the cryptocurrency.
 * @param {Posts} props.postData - Post data related to the cryptocurrency.
 * @param {boolean} props.isTinyScreen - Flag for identifying if the screen is tiny.
 * @returns {JSX.Element} - A JSX.Element representing the small screen container.
 */
function SmallScreenContainer(props: {
	cryptoData: LatestSentiment;
	postData: Posts;
	isTinyScreen: boolean;
}): JSX.Element {
	const cryptoData = props.cryptoData;
	const postData = props.postData;
	return (
		<Grid.Container>
			<Grid>
				<Text h4>Sentiment : {cryptoData.latestSentiment}</Text>

				<Container css={{ padding: "$1", margin: 0 }}>
					{/* Crypto gauge component */}
					<DCryptoGauge
						crypto={cryptoData}
						style={{ padding: 0, margin: 0 }}
					></DCryptoGauge>
				</Container>
				<Spacer></Spacer>
				<Container css={{ padding: "$1", margin: 0 }}>
					<Text h4>Historical Data</Text>
					{/* Crypto chart component */}
					<CryptoChart crypto={cryptoData}></CryptoChart>
				</Container>
				<Spacer></Spacer>
				{/* Crypto testimonials component */}
				<CryptoTestimonials
					posts={postData}
					subreddit={cryptoData.subreddit}
					css={{}}
				></CryptoTestimonials>
			</Grid>
		</Grid.Container>
	);
}

/**
 * Renders a container for the crypto data on large screens.
 * @param {CryptoPageProps} props - The props object.
 * @returns {JSX.Element} - The JSX Element for the big screen container.
 */
function BigScreenContainer({
	cryptoData,
	postData,
}: CryptoPageProps): JSX.Element {
	return (
		<Grid.Container
			justify="space-between"
			css={{ paddingLeft: "$15", paddingRight: "$15" }}
		>
			<Grid
				justify="center"
				css={{
					"@smMin": { width: 400 },
					"@mdMin": { width: 600 },
					"@lgMin": { width: 800 },
					"@xlMin": { width: 1000 },
				}}
			>
				<Text h4>Sentiment : {cryptoData.latestSentiment}</Text>
				{/* Crypto gauge component */}
				<DCryptoGauge
					crypto={cryptoData}
					style={{ width: 500, padding: 0, margin: 0 }}
				></DCryptoGauge>
				<Text h4>Historical Data</Text>
				{/* Crypto chart component */}
				<CryptoChart crypto={cryptoData}></CryptoChart>
			</Grid>

			<Grid justify="center">
				{/* Crypto testimonials component */}
				<CryptoTestimonials
					posts={postData}
					subreddit={cryptoData.subreddit}
					css={{
						height: 600,
						width: 400,
						"@smMin": { width: 350 },
						"@mdMin": { width: 400 },
						"@lgMin": { width: 400 },
						"@xlMin": { width: 400 },
					}}
				></CryptoTestimonials>
			</Grid>
		</Grid.Container>
	);
}
