import { getAllPosts, LatestSentiment, Posts } from "@/utility/firestore";
import { Container, Divider, Row, Spacer, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

type Props = {
	crypto: LatestSentiment;
};

export default function CryptoTestimonials({ crypto }: Props) {
	const [posts, setPosts] = useState<Posts | null>(null);

	useEffect(() => {
		async function getNewTestimonials() {
			getAllPosts(crypto.id).then((postData) => {
				setPosts(postData);
			});
			// getSentimentHistoryInRange(crypto.id, startTime, endTime).then(
			// 	(history) => {
			// 		console.log(history);
			// 		setHistory(history);
			// 		setData({
			// 			labels: history.map((value) => value.datetime),
			// 			datasets: [
			// 				{
			// 					label: `${crypto.id}`,
			// 					data: history.map(
			// 						(value) => value.sub_sentiment
			// 					),
			// 					borderColor: "rgb(255, 99, 132)",
			// 					backgroundColor: "rgba(255, 99, 132, 0.5)",
			// 				},
			// 			],
			// 		});
			// 	}
			// );
		}
		getNewTestimonials();
	}, []);

	const textAreas = posts
		? posts.map((postData) => {
				return (
					<>
						<Textarea
							css={{
								width: "400px",
							}}
							readOnly
							initialValue={postData.title}
						/>
						{/* <Divider /> */}
						<Spacer y={0.5} />
					</>
				);
		  })
		: null;

	return (
		<Container
			style={{
				overflowY: "auto",
				maxHeight: "600px",
				display: "flex",
				flexGrow: 1,
				flexDirection: "row",
				justifyItems: "flex-end",
			}}
		>
			{textAreas}
		</Container>
	);
}
