import React from "react";
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";
import { CssBaseline } from "@nextui-org/react";

/**
 * Custom Next.js document to handle server-side rendering and server-side rendering for styled-components
 */
class MyDocument extends Document {
	/**
	 * Get initial props for server side rendering
	 * @param {DocumentContext} ctx The context object
	 * @returns An object with initial props
	 */
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: React.Children.toArray([initialProps.styles]),
		};
	}

	/**
	 * Render the document
	 * @returns The rendered document
	 */
	render() {
		return (
			<Html lang="en">
				<Head>{CssBaseline.flush()}</Head> {/* Render Next UI CSS */}
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
