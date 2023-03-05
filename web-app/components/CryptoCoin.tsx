import { LatestSentiment } from "@/utility/firestore";
import { Container, Text } from "@nextui-org/react";
import { Grid, Row, Col, Card } from "@nextui-org/react";
import { Textarea, Spacer } from "@nextui-org/react";

export default function CryptoCoin(props: {
	specificCryptoData: LatestSentiment;
	hasError: boolean;
}) {
	return (
		<Container fluid alignItems="center" justify="space-between">
			<Text h3>{props.specificCryptoData.id}</Text>
			<Text h4>
				Sentiment : {props.specificCryptoData.latestSentiment}
			</Text>

			<Text h4>Testimonials</Text>
			<Spacer y={0.5} />
			<Textarea
				readOnly
				initialValue="Almost before we knew it, we had left the ground."
			/>

			<Text h4>Historical Data</Text>
		</Container>
	);
}
