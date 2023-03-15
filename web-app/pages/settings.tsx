import { selectUser } from "@/store/authslice";
import { useAppSelector } from "@/store/hooks";
import {
	removeUser,
	updateEmailAddress,
	updateUserProfile,
} from "@/utility/pass_auth";
import {
	Container,
	Text,
	Input,
	Modal,
	Spacer,
	Button,
	Checkbox,
	Row,
} from "@nextui-org/react";
import Head from "next/head";
import { use, useState } from "react";

export default function AccountSettings() {
	const user = useAppSelector(selectUser)!;
	const [name, setName] = useState(() => {
		if (user && user.displayName) {
			return user.displayName;
		}
		return "N/A";
	});
	const [email, setEmail] = useState(() => {
		if (user && user.email) {
			return user.email;
		}
		return "N/A";
	});
	const [readOnly, setReadOnly] = useState(true);

	const [deleteDisabled, setDeleteDisabled] = useState(true);

	function handleChange(event: { target: { name: string; value: string } }) {
		const { name, value } = event.target;

		switch (name) {
			case "name":
				setName(value);
				break;
			case "email":
				setEmail(value);
				break;
			case "confirmDelete":
				value == "DELETE"
					? setDeleteDisabled(false)
					: setDeleteDisabled(true);
				break;
			default:
				break;
		}
	}

	const [visible, setVisible] = useState(false);
	const modalHandler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
		console.log("closed");
	};

	return (
		<Container fluid aria-labelledby="setting-container">
			<Head aria-labelledby="setting-metadata">
				<title>Account Settings</title>
				<meta
					property="og:Settings"
					content="Settings"
					key="settings"
				/>
			</Head>
			<Text h3>Account Settings</Text>

			{user ? (
				<Container>
					<Text h5>Display Name</Text>
					<Input
						aria-labelledby="setting-name"
						readOnly={readOnly}
						name="name"
						value={name}
						onChange={handleChange}
					/>
					<Spacer y={1}></Spacer>
					<Text h5>Email Address</Text>
					<Input
						aria-labelledby="setting-email"
						readOnly={readOnly}
						name="email"
						value={email}
						onChange={handleChange}
					/>

					<Spacer y={1}></Spacer>

					<Container display="flex" justify="space-between">
						<Button
							auto
							ghost
							color="warning"
							onPress={() => setReadOnly(false)}
						>
							Edit Account
						</Button>
						<Button
							auto
							ghost
							color="secondary"
							onPress={() => {
								updateUserProfile({
									displayName: name,
									photoURL: "",
								});
								user.email === email
									? console.log("No change")
									: updateEmailAddress(email);

								setReadOnly(true);
							}}
						>
							Save Account
						</Button>
						<Button auto ghost color="error" onPress={modalHandler}>
							Delete Account
						</Button>
					</Container>

					<Modal
						closeButton
						blur
						aria-labelledby="modal-title"
						open={visible}
						onClose={closeHandler}
					>
						<Modal.Header>
							<Text id="modal-title" size={18}>
								Are you sure you would like to delete your
								account?
							</Text>
						</Modal.Header>
						<Modal.Body>
							<Input
								aria-labelledby="setting-delete"
								clearable
								bordered
								fullWidth
								color="primary"
								size="lg"
								name="confirmDelete"
								placeholder="Type DELETE to confirm"
								onChange={handleChange}
							/>
						</Modal.Body>
						<Modal.Footer justify="center">
							<Button auto flat onPress={closeHandler}>
								Close
							</Button>
							<Button
								color={"error"}
								disabled={deleteDisabled}
								auto
								onPress={() => removeUser()}
							>
								Delete Account
							</Button>
						</Modal.Footer>
					</Modal>
				</Container>
			) : (
				<>
					<Text h5>
						To view your account settings, sign in to your account.
					</Text>
				</>
			)}
		</Container>
	);
}
