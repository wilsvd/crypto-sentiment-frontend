import { Posts } from "@/utility/firestore";
import { Card, Spacer, Textarea, Text, Link, CSS } from "@nextui-org/react";
import React from "react";

/**
 * TestimonialProps for the CryptoTestimonials component.
 *
 * @typedef {Object} TestimonialProps - A new type named 'TestimonialProps'.
 * @property {Posts} posts - The posts data to be displayed.
 * @property {string} subreddit - The subreddit to fetch the testimonials from.
 * @property {CSS} css - Custom styles to be applied to the component.
 */
type TestimonialProps = {
	posts: Posts;
	subreddit: string;
	css: CSS;
};

/**
 * Returns an array of JSX textareas containing the titles of the given posts.
 * @param {Posts} posts - The array of post data to extract titles from.
 * @returns {JSX.Element[] | null} An array of JSX textareas containing the titles of the given posts.
 */
export function getTextArea(posts: Posts): JSX.Element[] | null {
	const textAreas = posts
		? posts.map((postData) => {
				return (
					<React.Fragment key={postData.id}>
						<Textarea
							aria-labelledby={`${postData.title}`}
							readOnly
							initialValue={postData.title}
							data-testid="post_title"
						/>
						<Spacer y={0.5} />
					</React.Fragment>
				);
		  })
		: null;
	return textAreas;
}

/**
 * CryptoTestimonials component
 *
 * @param {TestimonialProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export default function CryptoTestimonials({
	posts,
	subreddit,
	css,
}: TestimonialProps): JSX.Element {
	return (
		<Card aria-labelledby="testimonials-container">
			<Card.Header css={{ justifyContent: "center" }}>
				<Text h4>
					<Link
						data-testid="testimonial-subreddit-link"
						href={`https://www.reddit.com/r/${subreddit}/`}
						target="_blank"
					>
						Subreddit
					</Link>
					&nbsp;Testimonials
				</Text>
			</Card.Header>
			<Card.Body css={css}>{getTextArea(posts)}</Card.Body>
		</Card>
	);
}
