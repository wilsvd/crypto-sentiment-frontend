import Head from "next/head";
import { auth } from "@/config/firebase";
import { selectUser, setUser } from "@/store/authslice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Container, Text, Input, Spacer, Button } from "@nextui-org/react";
import { User, updateEmail, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";

/**
 * This component displays the account settings page where the user can update their display name and email address.
 * @returns {JSX.Element} JSX element
 */
export default function AccountSettings(): JSX.Element {
	const router = useRouter();

	// Get the current user from the Redux store
	const user = useAppSelector(selectUser)!;
	const dispatch = useAppDispatch();
	// Initialize the name and email state variables to empty strings
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	// When the component mounts or the user state changes, update the name and email state variables
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

	/**
	 * Update the user's display name in Firebase and the Redux store.
	 *
	 * @param user - the current Firebase user
	 * @param name - the new display name
	 */
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

	/**
	 * Update the user's email address in Firebase and the Redux store.
	 *
	 * @param user - the current Firebase user
	 * @param newEmail - the new email address
	 */
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

	/**
	 * Update the user's display name and email address in Firebase and the Redux store.
	 *
	 * @param name - the new display name
	 * @param newEmail - the new email address
	 */
	function updateUser(name: string, newEmail: string) {
		if (auth.currentUser) {
			const currUser = auth.currentUser;
			if (name !== user.displayName && newEmail === user.email) {
				updateUserProfile(currUser, name);
			} else if (name === user.displayName && newEmail !== user.email) {
				udateUserEmail(currUser, newEmail);
			} else if (name === user.displayName && newEmail !== user.email) {
				udateUserEmail(currUser, name);
				updateUserProfile(currUser, newEmail);
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

			{/* Display the user's account settings */}
			<Container css={{ padding: "10px" }}>
				<Text h3>Account Settings</Text>
				{/* Check if a user is logged in */}
				{user ? (
					<Container fluid>
						<Text h5>Display Name</Text>
						<Input
							type="text"
							name="name"
							fullWidth
							// Set the input to be read-only if the read-only flag is true
							readOnly={readOnly}
							aria-labelledby="setting-name"
							placeholder="Enter your display name"
							// Set the initial value of the input to the user's display name
							initialValue={name ? name : undefined}
							// Call the setName function when the input value changes
							onChange={(e) => setName(e.target.value)}
						/>
						<Spacer y={1}></Spacer>
						<Text h5>Email Address</Text>
						<Input
							type="email"
							name="email"
							fullWidth
							// Set the input to be read-only if the read-only flag is true
							readOnly={readOnly}
							aria-labelledby="setting-email"
							placeholder="Enter your display name"
							// Set the initial value of the input to the user's email address
							initialValue={email ? email : undefined}
							// Call the setEmail function when the input value changes
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Spacer y={1}></Spacer>
						{/* Display the edit, save, and delete account buttons */}
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
							{/* Display the edit account button */}
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
							{/* Display the save account button */}
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
							{/* Display the delete account button */}
							<Button
								auto
								ghost
								color="error"
								onPress={openHandler}
							>
								Delete Account
							</Button>
						</Container>
						{/* Open the delete account model if user clicks delete account */}
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
