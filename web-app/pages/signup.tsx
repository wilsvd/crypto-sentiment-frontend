import React from "react";
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
import Router from "next/router";

import { makeAccount } from "@/utility/pass_auth";

export default function Signup() {
	const [userDetails, setUserDetails] = React.useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [loginIsFailure, setLoginIsFailure] = React.useState(false);

	function submitForm() {
		const email = userDetails.email;
		const password = userDetails.password;
		const confirmPassword = userDetails.confirmPassword;

		if (password === confirmPassword) {
			makeAccount(email, password);
			setLoginIsFailure(false);
			Router.replace("/");
		} else {
			setLoginIsFailure(true);
			console.log("FAILURE");
		}
	}

	function handleChange(event: { target: { name: string; value: string } }) {
		const { name, value } = event.target;
		setUserDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	}

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
					value={userDetails.email}
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
					value={userDetails.password}
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
					value={userDetails.confirmPassword}
					onChange={handleChange}
				/>
				<Spacer y={1.6} />

				{/* TODO:  Create a new row which allows users to signup with Google*/}

				<Row justify="space-between"></Row>

				<Spacer y={1} />
				<Button onClick={submitForm}>Sign up</Button>
			</Card>
		</Container>
	);
}
