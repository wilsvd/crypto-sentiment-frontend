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
		}
		getNewTestimonials();
	}, [crypto.id]);

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
			aria-labelledby="testimonials-container"
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
