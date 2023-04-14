import { auth } from "@/config/firebase";
import { selectUser, setUser } from "@/store/authslice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteUserData } from "@/utility/firestore";
import {
	Container,
	Text,
	Input,
	Modal,
	Spacer,
	Button,
} from "@nextui-org/react";
import { deleteUser, updateEmail, updateProfile } from "firebase/auth";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function AccountSettings() {
	const user = useAppSelector(selectUser)!;
	const dispatch = useAppDispatch();
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [OGname, setOGName] = useState<string>("");
	const [OGemail, setOGEmail] = useState<string>("");

	useEffect(() => {
		if (user) {
			setName(() => (user.displayName ? user.displayName : ""));
			setEmail(() => (user.email ? user.email : ""));
			setOGName(() => (user.displayName ? user.displayName : ""));
			setOGEmail(() => (user.email ? user.email : ""));
		}
	}, [user]);

	const [readOnly, setReadOnly] = useState(true);
	const [deleteDisabled, setDeleteDisabled] = useState(true);
	const [visible, setVisible] = useState(false);
	const openHandler = () => setVisible(true);
	const closeHandler = () => setVisible(false);

	function updateUser(name: string, newEmail: string) {
		if (auth.currentUser) {
			if (name == "") {
				alert("Please enter a non-empty name");
				return;
			}
			const currUser = auth.currentUser;
			updateProfile(currUser, { displayName: name, photoURL: "" })
				.then(() => {
					if (user.email !== email) {
						updateEmail(currUser, newEmail)
							.then(() => {
								dispatch(
									setUser({
										...user,
										displayName: name,
										email: email,
									})
								);
							})
							.catch((error) => {
								alert("You have entered an invalid email");
								// An error occurred
								// ...
							});
					}
				})
				.catch((error) => {
					alert("The display name you entered is invalid");
				});
		}
		console.log(email);
	}

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

			<Container css={{ padding: "10px" }}>
				<Text h3>Account Settings</Text>
				{user ? (
					<Container fluid>
						<Text h5>Display Name</Text>
						<Input
							type="text"
							name="name"
							fullWidth
							readOnly={readOnly}
							aria-labelledby="setting-name"
							placeholder="Enter your display name"
							initialValue={name ? name : undefined}
							onChange={(e) => setName(e.target.value)}
						/>
						<Spacer y={1}></Spacer>
						<Text h5>Email Address</Text>
						<Input
							type="email"
							name="email"
							fullWidth
							readOnly={readOnly}
							aria-labelledby="setting-email"
							placeholder="Enter your display name"
							initialValue={email ? email : undefined}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Spacer y={1}></Spacer>

						<Container
							display="flex"
							justify="space-between"
							css={{
								padding: "$0",
								"@xsMax": {
									flexDirection: "column",
								},
							}}
						>
							<Button
								auto
								shadow
								flat={readOnly}
								color="warning"
								onPress={() => setReadOnly((prev) => !prev)}
							>
								Edit Account
							</Button>
							<Spacer
								css={{
									display: "none",
									"@xsMax": {
										display: "block",
									},
								}}
							/>
							<Button
								auto
								ghost
								color="secondary"
								onPress={() => {
									updateUser(name, email);
									setReadOnly(true);
								}}
							>
								Save Account
							</Button>
							<Spacer
								css={{
									display: "none",
									"@xsMax": {
										display: "block",
									},
								}}
							/>
							<Button
								auto
								ghost
								color="error"
								onPress={openHandler}
							>
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
									onChange={(e) => {
										e.target.value == "DELETE"
											? setDeleteDisabled(false)
											: setDeleteDisabled(true);
									}}
								/>
							</Modal.Body>
							<Modal.Footer justify="center">
								<Button
									color={"error"}
									disabled={deleteDisabled}
									auto
									onPress={() => {
										if (auth.currentUser) {
											const user = auth.currentUser;
											try {
												deleteUser(user).then(() => {
													// Delete user data from Firestore
													deleteUserData(user.email!);
												});
											} catch (error) {}
										}
										closeHandler();
									}}
								>
									Delete Account
								</Button>
							</Modal.Footer>
						</Modal>
					</Container>
				) : (
					<>
						<Text h5>
							To view your account settings, sign in to your
							account.
						</Text>
					</>
				)}
			</Container>
		</Container>
	);
}
