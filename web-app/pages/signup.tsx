import { useEffect, useState } from "react";
import {
	Card,
	Spacer,
	Button,
	Text,
	Input,
	Container,
} from "@nextui-org/react";
import { useRouter } from "next/router";

import Head from "next/head";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { provider } from "@/utility/googleAuth";

/**
 * Signup component that allows a user to sign up with their email and password or via Google authentication.
 *
 * @returns {JSX.Element}
 */
export default function Signup(): JSX.Element {
	const router = useRouter();

	// State variables for the email, password, and confirmation password input fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// State variables for displaying login failure message
	const [loginIsFailure, setLoginIsFailure] = useState(false);
	const [loginMessage, setLoginMessage] = useState("");

	// Prefetch the homepage for faster navigation
	useEffect(() => {
		router.prefetch("/");
	});

	/**
	 * Submits the signup form by creating a user with the email and password provided.
	 * If successful, the user is redirected to the homepage. Otherwise, a login failure message is displayed.
	 */
	function submitForm() {
		if (password === confirmPassword) {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCred) => {
					router.push("/");
					setLoginIsFailure(false);
				})
				.catch((error) => {
					switch (error.code) {
						case "auth/invalid-email":
							setLoginMessage("Invalid email address.");
							break;
						case "auth/weak-password":
							setLoginMessage(
								"Invalid password. Passwords must be longer than 6 characters."
							);
							break;
						case "auth/email-already-in-use":
							setLoginMessage(
								"Account specified already exists."
							);
							break;
						default:
							break;
					}
					console.log(error.code);
					setLoginIsFailure(true);
				});
		} else {
			setLoginIsFailure(true);
			setLoginMessage("Passwords entered do not match");
		}
	}

	/**
	 * Submits the signup form via Google authentication. If successful, the user is redirected to the homepage.
	 * Otherwise, a login failure message is displayed.
	 */
	function submitGoogle() {
		setLoginIsFailure(false);
		setLoginMessage("");

		signInWithPopup(auth, provider)
			.then((userCred) => {
				router.push("/");
				setLoginIsFailure(false);
			})
			.catch((error) => {
				switch (error.code) {
					case "auth/popup-closed-by-user":
						// This is a controlled event by the user and as such login is not being set to failure
						break;

					default:
						setLoginMessage("Popup error. Please try again.");
						setLoginIsFailure(true);
						break;
				}

				setLoginIsFailure(true);
			});
	}

	/**
	 * Handles change event for email, password, and confirm password inputs
	 *
	 * @param {Object} event - The event object
	 * @param {Object} event.target - The target element of the event
	 * @param {string} event.target.name - The name of the input field being changed
	 * @param {string} event.target.value - The new value of the input field
	 */
	function handleChange(event: { target: { name: string; value: string } }) {
		const { name, value } = event.target;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		} else {
			setConfirmPassword(value);
		}
	}

	return (
		<Container
			fluid
			aria-labelledby="signup-container"
			display="flex"
			alignItems="center"
			justify="center"
			aria-label="Signup form"
		>
			<Head aria-labelledby="signup-metadata">
				<title>Sign Up</title>
				<meta property="og:Sign Up" content="Sign Up" key="signup" />
			</Head>
			<Card
				aria-labelledby="signup-card"
				css={{
					mw: "420px",
					p: "20px",
					marginTop: "$12",
					"@xs": {
						marginTop: "$14",
					},
					"@sm": {
						marginTop: "$16",
					},
					"@md": {
						marginTop: "$18",
					},
					"@lg": {
						marginTop: "$20",
					},
				}}
				variant="bordered"
			>
				<Text
					h3
					weight="bold"
					css={{
						as: "center",
						mb: "20px",
					}}
				>
					Sign Up
				</Text>
				{/* Render error message if login attempt failed */}
				{loginIsFailure && (
					<Text h5 color="error">
						{loginMessage}
					</Text>
				)}
				{/* Email input field */}
				<Input
					type="email"
					aria-labelledby="signup-email-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					placeholder="Email"
					name="email"
					onChange={handleChange}
				/>
				<Spacer y={1} />
				{/* Password input field */}
				<Input.Password
					type="password"
					aria-labelledby="signup-pass-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					placeholder="Password"
					css={{ mb: "6px" }}
					name="password"
					onChange={handleChange}
				/>
				<Spacer y={1} />
				{/* Confirm password input field */}
				<Input.Password
					type="password"
					aria-labelledby="signup-confirm-pass-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					placeholder="Confirm your password"
					css={{ mb: "6px" }}
					name="confirmPassword"
					onChange={handleChange}
				/>
				<Spacer y={1.6} />
				<Button onPress={submitForm}>Sign up</Button>
				<Spacer y={1} />
				<Button onPress={submitGoogle}>Sign up with Google</Button>
			</Card>
		</Container>
	);
}
