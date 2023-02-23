interface cryptoInterface {
	key: string;
	cryptocurrency: string;
	sentiment: string;
}

import { Container, Text } from "@nextui-org/react";
import { Grid, Row, Col, Card } from "@nextui-org/react";
import { Textarea, Spacer } from "@nextui-org/react";

export default function CryptoCoin(props: {
	specificCryptoData: cryptoInterface;
	hasError: boolean;
}) {
	return (
		<Container fluid alignItems="center" justify="space-between">
			<Text h3>{props.specificCryptoData.cryptocurrency}</Text>
			<Text h4>Sentiment : {props.specificCryptoData.sentiment}</Text>

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
