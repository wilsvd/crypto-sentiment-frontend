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

export default function Signup() {
	return (
		<Container
			display="flex"
			alignItems="center"
			justify="center"
			css={{ minHeight: "100vh" }}
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
				<Spacer y={1} />

				<Input.Password
					clearable
					underlined
					fullWidth
					color="primary"
					size="lg"
					placeholder="Confirm your password"
					css={{ mb: "6px" }}
				/>
				<Spacer y={1.6} />

				{/* TODO:  Create a new row which allows users to signup with Google*/}

				<Row justify="space-between"></Row>

				<Spacer y={1} />
				<Button>Sign up</Button>
			</Card>
		</Container>
	);
}
