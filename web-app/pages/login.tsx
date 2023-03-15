import React, { useContext, useEffect, useState } from "react";
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
import { signInGoogle } from "@/utility/google_auth";
import { signInAccount } from "@/utility/pass_auth";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/authslice";

export default function Login() {
	const user = useAppSelector(selectUser);
	const router = useRouter();

	const [emailInput, setEmailInput] = useState("");
	const [password, setPassword] = useState("");
	const [loginIsFailure, setLoginIsFailure] = useState(false);

	useEffect(() => {
		router.prefetch("/");
	}, []);
	function submitForm() {
		signInAccount(emailInput, password).then((success) => {
			success ? router.push("/") : setLoginIsFailure(true);
		});
	}

	function submitGoogle() {
		signInGoogle().then((success) => (success ? router.push("/") : null));
	}
	function handleChange(event: { target: { name: string; value: string } }) {
		const { name, value } = event.target;
		name === "emailInput" ? setEmailInput(value) : setPassword(value);
	}

	return (
		<Container
			aria-labelledby="login-container"
			display="flex"
			alignItems="center"
			justify="center"
			css={{ minHeight: "100vh" }}
			aria-label="Login form"
		>
			<Card css={{ mw: "420px", p: "20px" }} variant="bordered">
				<Text
					size={24}
					weight="bold"
					css={{
						as: "center",
						mb: "20px",
					}}
				>
					Login
				</Text>
				{loginIsFailure && (
					<Text h5>You entered an incorrect email or password</Text>
				)}
				<Input
					aria-labelledby="login-email-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					name="emailInput"
					placeholder="Email"
					value={emailInput}
					onChange={handleChange}
				/>
				<Spacer y={1} />

				<Input.Password
					aria-labelledby="login-pass-input"
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					name="password"
					placeholder="Password"
					css={{ mb: "6px" }}
					value={password}
					onChange={handleChange}
				/>
				<Spacer y={1.6} />

				<Row justify="space-between">
					<Checkbox>
						<Text size={14}>Remember me</Text>
					</Checkbox>

					{/* TODO:  Implement a method to request for forgotten password*/}
					<Text size={14}>Forgot password?</Text>
				</Row>
				<Spacer y={1.6} />

				{/* TODO:  Create a new row which allows users to login with Google*/}
				<Button onPress={submitGoogle}>Sign in with Google</Button>
				{/* <Row justify="space-between">
					<Image
						src="/google-icon.svg"
						alt="google logo"
						width={48}
						height={48}
						onClick={() => console.log("YOU CLICK")}
					></Image>
				</Row> */}

				<Spacer y={1} />
				<Button onPress={submitForm}>Sign in</Button>
			</Card>
		</Container>
	);
}
