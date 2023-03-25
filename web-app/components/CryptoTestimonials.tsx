import { Posts } from "@/utility/firestore";
import { Container, Spacer, Textarea } from "@nextui-org/react";
import React from "react";

type Props = {
	posts: Posts;
};

export default function CryptoTestimonials({ posts }: Props) {
	const textAreas = posts
		? posts.map((postData) => {
				return (
					<React.Fragment key={postData.id}>
						<Textarea
							aria-labelledby={`${postData.title}`}
							css={{
								width: "400px",
							}}
							readOnly
							initialValue={postData.title}
						/>
						<Spacer y={0.5} />
					</React.Fragment>
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
