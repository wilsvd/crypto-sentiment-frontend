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
import { signInGoogle } from "@/utility/google_auth";
import { useRouter } from "next/router";

import { makeAccount } from "@/utility/pass_auth";
import Head from "next/head";

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
			makeAccount(email, password).then((success) => {
				if (success) {
					setLoginIsFailure(false);
					router.push("/");
				} else {
					// Get an better error message
					console.log("SOMETHING WENT WRONG");
				}
			});
		} else {
			setLoginIsFailure(true);
			console.log("FAILURE");
		}
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
					aria-labelledby="signup-email-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					placeholder="Email"
					name="email"
					value={email}
					onChange={handleChange}
				/>
				<Spacer y={1} />

				<Input.Password
					aria-labelledby="signup-pass-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					placeholder="Password"
					css={{ mb: "6px" }}
					name="password"
					value={password}
					onChange={handleChange}
				/>
				<Spacer y={1} />

				<Input.Password
					aria-labelledby="signup-confirm-pass-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					placeholder="Confirm your password"
					css={{ mb: "6px" }}
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
				/>
				<Spacer y={1} />

				{/* TODO:  Create a new row which allows users to signup with Google*/}

				<Row justify="space-between"></Row>

				<Spacer y={1} />
				<Button onPress={signInGoogle}>Sign up with Google</Button>
				<Spacer y={1} />
				<Button onPress={submitForm}>Sign up</Button>
			</Card>
		</Container>
	);
}
