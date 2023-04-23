import router from "next/router";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { useState } from "react";
import { deleteUserData } from "@/utility/firestore";
import { deleteUser } from "firebase/auth";
import { auth } from "@/config/firebase";

/**
 * Props for DeleteAccountModal component
 * @typedef {Object} DeleteProps - A new type named 'DeleteProps'
 * @property {boolean} visible - A boolean value indicating if the modal is visible or not.
 * @property {function} closeHandler - A function to close the modal when triggered.
 */
type DeleteProps = {
	visible: boolean;
	closeHandler: () => void;
};

/**
 * Component that displays a modal to confirm the deletion of a user's account
 * @param {Props} props - The properties of the component
 * @returns {JSX.Element} - The DeleteAccountModal component
 */
export default function DeleteAccountModal({
	visible,
	closeHandler,
}: DeleteProps): JSX.Element {
	const [deleteDisabled, setDeleteDisabled] = useState(true);

	/**
	 * Function that checks if "DELETE" has been typed
	 * @param {object} event - The input change event
	 * @param {object} event.target - The target element of the event
	 * @param {string} event.target.name - The name of the input
	 * @param {string} event.target.value - The value of the input
	 */
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
