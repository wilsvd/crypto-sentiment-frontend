import { useContext, useState } from "react";
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
import { signInGoogle } from "@/utility/google_auth";
import Router from "next/router";

import { makeAccount } from "@/utility/pass_auth";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loginIsFailure, setLoginIsFailure] = useState(false);

	function submitForm() {
		if (password === confirmPassword) {
			makeAccount(email, password).then((success) => {
				if (success) {
					setLoginIsFailure(false);
					Router.replace("/");
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

	console.log(email, password, confirmPassword);

	return (
		<Container
			display="flex"
			alignItems="center"
			justify="center"
			css={{ minHeight: "100vh" }}
			aria-label="Signup form"
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
					Signup
				</Text>
				{loginIsFailure && (
					<Text h5>The passwords you entered do not match.</Text>
				)}
				<Input
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
				<Button onClick={signInGoogle}>Sign up with Google</Button>
				<Spacer y={1} />
				<Button onClick={submitForm}>Sign up</Button>
			</Card>
		</Container>
	);
}
