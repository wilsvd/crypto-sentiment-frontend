import router from "next/router";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { useState } from "react";
import { deleteUserData } from "@/utility/firestore";
import { deleteUser } from "firebase/auth";
import { auth } from "@/config/firebase";

type Props = {
	visible: boolean;
	closeHandler: () => void;
};

export default function DeleteAccountModal({ visible, closeHandler }: Props) {
	const [deleteDisabled, setDeleteDisabled] = useState(true);

	function handleChange(event: { target: { name: string; value: string } }) {
		event.target.value == "DELETE"
			? setDeleteDisabled(false)
			: setDeleteDisabled(true);
	}

	return (
		<Modal
			closeButton
			blur
			aria-labelledby="modal-title"
			open={visible}
			onClose={closeHandler}
		>
			<Modal.Header>
				<Text id="modal-title" size={18}>
					Are you sure you would like to delete your account?
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
										deleteUserData(user.email!);
									})
									.catch((error) => {
										switch (error.code) {
											case "auth/requires-recent-login":
												const res = confirm(
													"Please re-validate your account. You will be redirected to the login page."
												);
												closeHandler();
												if (res) {
													router.push("/login");
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
	);
}
