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
import { User, deleteUser, updateEmail, updateProfile } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AccountSettings() {
	const router = useRouter();
	const user = useAppSelector(selectUser)!;
	const dispatch = useAppDispatch();
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	useEffect(() => {
		if (user) {
			setName(() => (user.displayName ? user.displayName : ""));
			setEmail(() => (user.email ? user.email : ""));
		}
	}, [user]);

	const [readOnly, setReadOnly] = useState(true);
	const [deleteDisabled, setDeleteDisabled] = useState(true);
	const [visible, setVisible] = useState(false);

	const openHandler = () => setVisible(true);
	const closeHandler = () => setVisible(false);

	function updateUserProfile(user: User, name: string) {
		updateProfile(user, { displayName: name, photoURL: "" })
			.then(() => {
				dispatch(
					setUser({
						...user,
						displayName: name,
					})
				);
			})
			.catch((error) => {
				alert("The display name you entered is invalid");
			});
	}
	function udateUserEmail(user: User, newEmail: string) {
		updateEmail(user, newEmail)
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
				switch (error.code) {
					case "auth/invalid-email":
						alert("You have entered an invalid email");
						break;
					case "auth/requires-recent-login":
						const res = confirm(
							"Please re-validate your account. You will be redirected to the login page."
						);
						closeHandler();
						if (res) {
							router.push("/login");
						}

						break;
					case "auth/email-already-in-use":
						alert("Account specified already exists.");
						break;
					default:
						break;
				}
			});
	}

	function updateUser(name: string, newEmail: string) {
		if (auth.currentUser) {
			const currUser = auth.currentUser;
			if (name !== user.displayName && email === user.email) {
				updateUserProfile(currUser, name);
			} else if (name === user.displayName && email !== user.email) {
				udateUserEmail(currUser, email);
			} else if (name === user.displayName && email !== user.email) {
				udateUserEmail(currUser, name);
				updateUserProfile(currUser, email);
			}
			return;
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
												deleteUser(user)
													.then(() => {
														// Delete user data from Firestore
														deleteUserData(
															user.email!
														);
													})
													.catch((error) => {
														switch (error.code) {
															case "auth/requires-recent-login":
																const res =
																	confirm(
																		"Please re-validate your account. You will be redirected to the login page."
																	);
																closeHandler();
																if (res) {
																	router.push(
																		"/login"
																	);
																}
																break;

															default:
																break;
														}
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

import React from "react";
