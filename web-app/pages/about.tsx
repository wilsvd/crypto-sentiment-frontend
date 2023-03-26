import { selectCryptoData } from "@/store/cryptoslice";
import { useAppSelector } from "@/store/hooks";
import { Button, Card, Container, Link, Spacer, Text } from "@nextui-org/react";
import Head from "next/head";

export default function About() {
	return (
		<Container fluid aria-labelledby="about-container">
			<Head aria-labelledby="about-metadata">
				<title>About</title>
				<meta property="og:About" content="About" key="about" />
			</Head>
			<Container css={{ padding: "10px" }}>
				<Text h3>About</Text>
				<Container>
					<Card variant="bordered">
						<Card.Body>
							<Text h5>Application Purpose</Text>
							<Text>
								The objective of the application is to help
								people make more informed cryptocurrency
								investment decisions by providing the market
								sentiment of specific cryptocurrencies.
							</Text>
						</Card.Body>
					</Card>
					<Spacer y={1}></Spacer>
					<Card variant="bordered">
						<Card.Body>
							<Text h5>Application Functionality</Text>
							<Text>
								The market sentiment of cryptocurrencies is
								calculated using posts from Reddit. The
								assumption made is that post titles are
								representative of the opinion that people have
								regarding a cryptocurrency or the environment
								surrounding it. A machine learning model based
								on the transformers architecture called
								&quot;twitter-roberta-base-sentiment-latest&quot;
								is used to carry out the sentiment analysis on
								the post titles. Post titles are either
								positive, neutral or negative and these values
								are encoded into 1, 0, and -1. The subreddit
								sentiment is then calculated by taking the sum
								of sentiments from all post titles of a
								subreddit and dividing by the number of posts
								collected.
							</Text>
						</Card.Body>
					</Card>
					<Spacer y={1}></Spacer>
					<Card variant="bordered">
						<Card.Body>
							<Text h5>Personal Data</Text>
							<Text>
								Google Firebase Authentication is used to handle
								the authentication of users. The data that users
								submit when they create their accounts is
								limited to your email address and display name.
								Users can edit or delete their account in
								Account Settings. Additionally, users who are
								logged into an account can favourite
								cryptocurrencies. The data is only used for the
								purpose of improving the users experience by
								displaying all cryptocurrencies that the user is
								interested in under the Watchlist.
								<br />
								Please{" "}
								<Link href="mailto: wilvandijkhuizen@gmail.com">
									contact us
								</Link>{" "}
								regarding any requests.
							</Text>
						</Card.Body>
					</Card>
					<Spacer y={1}></Spacer>
					<Card variant="bordered">
						<Card.Body>
							<Text h5>Financial Guidance</Text>

							<Text>
								This is NOT Financial/Investment Advice. All
								information displayed on the web application is
								purely to increase the knowledge of individuals
								regarding the market sentiment.
								<br />
								<b>
									Be aware that Reddit posts and the sentiment
									analysis carried out may not reflect
									reality.
								</b>
							</Text>
						</Card.Body>
					</Card>
				</Container>
			</Container>
		</Container>
	);
}
