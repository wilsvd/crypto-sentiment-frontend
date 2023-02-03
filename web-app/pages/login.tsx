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

export default function Login() {
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
				<Input
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					placeholder="Email"
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
				/>
				<Spacer y={1.6} />

				<Row justify="space-between">
					<Checkbox>
						<Text size={14}>Remember me</Text>
					</Checkbox>

					{/* TODO:  Implement a method to request for forgotten password*/}
					<Text size={14}>Forgot password?</Text>
				</Row>

				{/* TODO:  Create a new row which allows users to login with Google*/}

				<Spacer y={1} />
				<Button>Sign in</Button>
			</Card>
		</Container>
	);
}
