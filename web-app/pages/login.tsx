import React, { useEffect, useState } from "react";
import {
	Card,
	Spacer,
	Button,
	Text,
	Input,
	Row,
	Checkbox,
	Container,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import Head from "next/head";

import { auth } from "@/config/firebase";
import {
	setPersistence,
	signInWithPopup,
	browserLocalPersistence,
	signInWithEmailAndPassword,
	inMemoryPersistence,
} from "firebase/auth";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal";
import { provider } from "@/utility/googleAuth";

/**
 * Login page component for user login
 * @returns {JSX.Element}
 */
export default function Login(): JSX.Element {
	const router = useRouter();

	// Local state variables
	const [emailInput, setEmailInput] = useState("");
	const [password, setPassword] = useState("");
	const [loginIsFailure, setLoginIsFailure] = useState(false);
	const [loginMessage, setLoginMessage] = useState("");

	const [rememberMe, setRememberMe] = useState(true);
	const [message, setMessage] = useState("Please enter your email address.");
	const [visible, setVisible] = useState(false);

	// Prefetch the homepage for faster navigation
	useEffect(() => {
		router.prefetch("/");
	});

	/**
	 * Sign in with email and password
	 */
	function submitForm() {
		const persistType = rememberMe
			? browserLocalPersistence
			: inMemoryPersistence;

		// Persist user
		setPersistence(auth, persistType)
			.then(() => {
				signInWithEmailAndPassword(auth, emailInput, password)
					.then(() => {
						router.push("/");
						setLoginIsFailure(false);
					})
					.catch((error) => {
						console.log(error);
						setLoginMessage(
							"You entered an invalid email or password."
						);
						setLoginIsFailure(true);
					});
			})
			.catch(() => {
				setLoginMessage(
					"Error occurred with the 'remember me' setting. Please try again later."
				);
				setLoginIsFailure(true);
			});
	}

	/**
	 * Sign in with Google
	 */
	function submitGoogle() {
		const persistType = rememberMe
			? browserLocalPersistence
			: inMemoryPersistence;
		setLoginIsFailure(false);
		setLoginMessage("");
		// Persist user
		setPersistence(auth, persistType)
			.then(() => {
				signInWithPopup(auth, provider)
					.then(() => {
						router.push("/");
						setLoginIsFailure(false);
					})
					.catch((error) => {
						switch (error.code) {
							case "auth/popup-closed-by-user":
								// This is a controlled event by the user and as such login is not being set to failure
								break;

							default:
								setLoginMessage(
									"Popup error. Please try again."
								);
								setLoginIsFailure(true);
								break;
						}

						setLoginIsFailure(true);
					});
			})
			.catch(() => {
				setLoginMessage(
					"Error occurred with the 'remember me' setting. Please try again later."
				);
				setLoginIsFailure(true);
			});
	}

	/**
	 * Function that handles the change event of input fields
	 *
	 * @param {Object} event - The event object
	 * @param {Object} event.target - The target element of the event
	 * @param {string} event.target.name - The name of the input field being changed
	 * @param {string} event.target.value - The new value of the input field
	 */
	function handleChange(event: { target: { name: string; value: string } }) {
		const { name, value } = event.target;
		name === "emailInput" ? setEmailInput(value) : setPassword(value);
		console.log(emailInput);
	}

	// Show forgot password modal
	const openForgotPassword = () => setVisible(true);
	// Close forgot password modal
	const closeForgotPassword = () => {
		setMessage("Please enter your email address.");
		setVisible(false);
		console.log("closed");
	};

	return (
		<Container
			fluid
			aria-labelledby="login-container"
			display="flex"
			alignItems="center"
			justify="center"
			aria-label="Login form"
		>
			<Head aria-labelledby="login-metadata">
				<title>Login</title>
				<meta property="og:Login" content="Login" key="login" />
			</Head>
			<Card
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
					Login
				</Text>
				{loginIsFailure && (
					<Text h5 color="error">
						{loginMessage}
					</Text>
				)}
				<Input
					type="email"
					aria-labelledby="login-email-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					name="emailInput"
					placeholder="Email"
					onChange={handleChange} // calls the handleChange function when the email input is changed
				/>
				<Spacer y={1} />
				<Input.Password
					type="password"
					aria-labelledby="login-pass-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					name="password"
					placeholder="Password"
					css={{ mb: "6px" }}
					onChange={handleChange} // calls the handleChange function when the password input is changed
				/>
				<Spacer y={1} />
				<Row justify="space-between">
					<Checkbox
						isSelected={rememberMe}
						onClick={() => setRememberMe((oldVal) => !oldVal)}
					>
						<Text size={14}>Remember me</Text>
					</Checkbox>

					<Button auto flat size={"sm"} onPress={openForgotPassword}>
						<Text size={14}>Forgot password?</Text>
					</Button>
				</Row>
				<Spacer y={1.6} />
				{/**calls the submitForm function when the "Sign in" button is clicked */}
				<Button onPress={submitForm}>Sign in</Button> <Spacer y={1} />
				{/**calls the submitGoogle function when the "Sign in with Google" button is clicked */}
				<Button onPress={submitGoogle}>Sign in with Google</Button>
			</Card>

			<ForgotPasswordModal
				visible={visible}
				closeHandler={closeForgotPassword}
				message={message}
				setMessage={setMessage}
			/>
		</Container>
	);
}
