import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { useState } from "react";

import { CSS, Container, Grid, Spacer, Text } from "@nextui-org/react";
import {
	addFavouriteCryptocurrency,
	getAllPosts,
	getCryptoLatestSentiment,
	LatestSentiment,
	Posts,
	removeFavouriteCryptocurrency,
} from "@/utility/firestore";
import CryptoChart from "@/components/cryptodata/CryptoChart";
import CryptoTestimonials from "@/components/cryptodata/CryptoTestimonials";

import useMediaQuery, {
	MediaBreakpoints,
	useAppDispatch,
	useAppSelector,
} from "@/store/hooks";
import {
	selectCryptoData,
	selectCryptoLoaded,
	setCryptoData,
} from "@/store/cryptoslice";
import {
	selectFavLoaded,
	selectFavourites,
	setFavourites,
} from "@/store/usercryptoslice";
import { selectUser } from "@/store/authslice";

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

const DCryptoGauge = dynamic(
	() => import("@/components/cryptodata/CryptoGauge"),
	{
		ssr: false,
	}
);

type Props = {
	cryptoData: LatestSentiment;
	postData: Posts;
};

function CryptoPage({ cryptoData, postData }: Props) {
	const isSmallScreen = useMediaQuery(`(max-width: ${MediaBreakpoints.sm})`);
	const isTinyScreen = useMediaQuery(`(max-width: ${412})`);

	const fullData = useAppSelector(selectCryptoData);
	const dispatch = useAppDispatch();

	const user = useAppSelector(selectUser);
	const userFavourites = useAppSelector(selectFavourites);
	const [isFavourite, setIsFavourite] = useState<boolean>(
		userFavourites.includes(cryptoData.id)
	);

	const userFavouritesLoaded = useAppSelector(selectFavLoaded);
	const cryptoLoaded = useAppSelector(selectCryptoLoaded);

	const toggleFavorite = (crypto: string) => {
		if (!user || !user.email) {
			alert(
				"You are not logged in. Please create an account or login to favourite cryptocurrencies."
			);
			return;
		}

		const isFavorited = userFavourites.includes(crypto);
		setIsFavourite(!isFavorited);
		const updateFavoritedCrypto = () => {
			const result = fullData.map((data) => {
				if (data.cryptocurrency === crypto) {
					return {
						...data,
						favourite: isFavorited ? false : true,
					};
				}
				return { ...data };
			});
			dispatch(setCryptoData(result));

			if (isFavorited) {
				dispatch(
					setFavourites(
						userFavourites.filter(
							(favourite) => favourite !== crypto
						)
					)
				);
				removeFavouriteCryptocurrency(user.email!, crypto);
			} else {
				dispatch(setFavourites([...userFavourites, crypto]));
				addFavouriteCryptocurrency(user.email!, crypto);
			}
		};

		updateFavoritedCrypto();
	};

	const router = useRouter();
	const tinyStyle: CSS = isTinyScreen
		? { padding: "10px", overflowX: "auto" }
		: { padding: "10px" };

	if (router.isFallback) {
		return <h1>Loading...</h1>;
	}
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
							onClick={() => toggleFavorite(cryptoData.id)}
							width={28}
							height={28}
						/>
					) : (
						<Image
							data-testid="favourite-image"
							sizes=""
							style={{ cursor: "pointer" }}
							aria-labelledby="dashboard-table-unfavourite"
							src="/iconmonstr-heart-thin.svg"
							alt="me"
							onClick={() => toggleFavorite(cryptoData.id)}
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

export default CryptoPage;

function SmallScreenContainer(props: {
	cryptoData: LatestSentiment;
	postData: Posts;
	isTinyScreen: any;
}) {
	const cryptoData = props.cryptoData;
	const postData = props.postData;
	const isTinyScreen = props.isTinyScreen;
	return (
		<Grid.Container>
			<Grid>
				<Text h4>Sentiment : {cryptoData.latestSentiment}</Text>

				<Container css={{ padding: "$1", margin: 0 }}>
					<DCryptoGauge
						crypto={cryptoData}
						style={{ padding: 0, margin: 0 }}
					></DCryptoGauge>
				</Container>
				<Spacer></Spacer>
				<Container css={{ padding: "$1", margin: 0 }}>
					<Text h4>Historical Data</Text>
					<CryptoChart crypto={cryptoData}></CryptoChart>
				</Container>
				<Spacer></Spacer>
				<CryptoTestimonials
					posts={postData}
					subreddit={cryptoData.subreddit}
					css={{}}
				></CryptoTestimonials>
			</Grid>
		</Grid.Container>
	);
}

function BigScreenContainer({ cryptoData, postData }: Props) {
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

				<DCryptoGauge
					crypto={cryptoData}
					style={{ width: 500, padding: 0, margin: 0 }}
				></DCryptoGauge>
				<Text h4>Historical Data</Text>
				<CryptoChart crypto={cryptoData}></CryptoChart>
			</Grid>

			<Grid justify="center">
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
