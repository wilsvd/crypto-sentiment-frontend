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
import Image from "next/image";
import { signInGoogle } from "@/utility/google_auth";
import { accountObserver, signInAccount } from "@/utility/pass_auth";
import Router from "next/router";

export default function Login() {
	const [userDetails, setUserDetails] = React.useState({
		email: "",
		password: "",
	});

	const [loginIsFailure, setLoginIsFailure] = React.useState(false);

	function submitForm() {
		const email = userDetails.email;
		const password = userDetails.password;
		if (signInAccount(email, password)) {
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
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					name="email"
					placeholder="Email"
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
					name="password"
					placeholder="Password"
					css={{ mb: "6px" }}
					value={userDetails.password}
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
				<Button onClick={signInGoogle}>Sign in with Google</Button>
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
				<Button onClick={submitForm}>Sign in</Button>
			</Card>
		</Container>
	);
}
