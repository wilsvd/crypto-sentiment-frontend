import { useEffect, useState } from "react";
import {
	Card,
	Spacer,
	Button,
	Text,
	Input,
	Row,
	Container,
} from "@nextui-org/react";
import { useRouter } from "next/router";

import { makeAccount } from "@/utility/passAuth";
import Head from "next/head";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { provider } from "@/utility/googleAuth";

export default function Signup() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loginIsFailure, setLoginIsFailure] = useState(false);

	useEffect(() => {
		router.prefetch("/");
	});

	function submitForm() {
		if (password === confirmPassword) {
			try {
				const userCredential = createUserWithEmailAndPassword(
					auth,
					email,
					password
				).then((userCredential) => {
					const success = userCredential.user ? true : false;
					if (success) {
						setLoginIsFailure(false);
						router.push("/");
					} else {
						// Get an better error message
						console.log("SOMETHING WENT WRONG");
					}
				});
			} catch (error) {
				// auth/email-already-in-use
				console.log("SOMETHING WENT WRONG");
			}
		} else {
			setLoginIsFailure(true);
			console.log("FAILURE");
		}
	}

	function submitGoogle() {
		signInWithPopup(auth, provider).then((userCred) => {
			// userCred ? router.push("/") : null;
			setLoginIsFailure(false);
		});
	}

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
			aria-labelledby="signup-container"
			display="flex"
			alignItems="center"
			justify="center"
			css={{ minHeight: "100vh" }}
			aria-label="Signup form"
		>
			<Head aria-labelledby="signup-metadata">
				<title>Signup</title>
				<meta property="og:Signup" content="Signup" key="signup" />
			</Head>
			<Card
				aria-labelledby="signup-card"
				css={{ mw: "420px", p: "20px" }}
				variant="bordered"
			>
				<Text
					size={24}
					weight="bold"
					css={{
						as: "center",
						mb: "20px",
					}}
				>
					Signup
				</Text>
				{loginIsFailure && (
					<Text h5>The passwords you entered do not match.</Text>
				)}
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
