import { Posts } from "@/utility/firestore";
import {
	Card,
	Container,
	Spacer,
	Textarea,
	Text,
	Link,
	Grid,
	CSS,
} from "@nextui-org/react";
import React from "react";

type Props = {
	posts: Posts;
	subreddit: string;
	css: CSS;
};

export default function CryptoTestimonials({ posts, subreddit, css }: Props) {
	const textAreas = posts
		? posts.map((postData) => {
				return (
					<React.Fragment key={postData.id}>
						<Textarea
							aria-labelledby={`${postData.title}`}
							readOnly
							initialValue={postData.title}
						/>
						<Spacer y={0.5} />
					</React.Fragment>
				);
		  })
		: null;

	return (
		<Card aria-labelledby="testimonials-container">
			<Card.Header css={{ justifyContent: "center" }}>
				<Text h4>
					<Link
						href={`https://www.reddit.com/r/${subreddit}/`}
						target="_blank"
					>
						Subreddit
					</Link>
					&nbsp;Testimonials
				</Text>
			</Card.Header>
			<Card.Body css={css}>{textAreas}</Card.Body>
		</Card>
	);
}
