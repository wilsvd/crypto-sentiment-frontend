import Head from "next/head";
import { auth } from "@/config/firebase";
import { selectUser, setUser } from "@/store/authslice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Container, Text, Input, Spacer, Button } from "@nextui-org/react";
import { User, updateEmail, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";

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
						<DeleteAccountModal
							visible={visible}
							closeHandler={closeHandler}
						/>
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
