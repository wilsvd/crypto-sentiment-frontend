import { auth } from "@/config/firebase";
import { sendPasswordResetEmail } from "@firebase/auth";
import { Text, Input, Modal, Button } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";

/**
 * ForgotProps for the ForgotPasswordModal component.
 *
 * @typedef {Object} ForgotProps - A new type named 'ForgotProps'
 * @property {boolean} visible - a boolean indicating if the modal is visible or not
 * @property {Function} closeHandler - a function to close the modal
 * @property {string} message - a string representing the message displayed in the modal header
 * @property {Dispatch<SetStateAction<string>>} setMessage - a function to update the message displayed in the modal header
 */
type ForgotProps = {
	visible: boolean;
	closeHandler: () => void;
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
};

/**
 * Component that renders a modal for resetting password
 * @param {ForgotProps} props - The props for the component
 * @returns {JSX.Element} a JSX element that displays a modal for resetting password
 */
export default function ForgotPasswordModal({
	visible,
	closeHandler,
	message,
	setMessage,
}: ForgotProps): JSX.Element {
	const [emailInput, setEmailInput] = useState("");

	/**
	 * Function that updates the email address as the user types
	 * @param {Object} event - The input change event
	 * @param {Object} event.target - The target element of the event
	 * @param {string} event.target.name - The name of the input
	 * @param {string} event.target.value - The value of the input
	 */
	function handleChange(event: { target: { name: string; value: string } }) {
		const { name, value } = event.target;
		name === "emailInput" ? setEmailInput(value) : null;
	}

	/**
	 * Function that sends a password reset email to the input email address
	 */
	function resetPasswordHandler() {
		sendPasswordResetEmail(auth, emailInput)
			.then(() => {
				// Password reset email sent!
				// ..
				setMessage(
					"Email has been successfully sent to your inbox. Please check your email."
				);
			})
			.catch((error) => {
				// alert("Password Reset Failed")
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
	}
	return (
		<Modal
			closeButton
			blur
			aria-labelledby="password-modal-title"
			open={visible}
			onClose={closeHandler}
		>
			<Modal.Header>
				<Text id="password-modal-title" size={18}>
					{message}
				</Text>
			</Modal.Header>
			<Modal.Body>
				<Input
					type="email"
					clearable
					bordered
					fullWidth
					color="primary"
					size="lg"
					name="emailInput"
					placeholder="Email"
					onChange={handleChange}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					auto
					flat
					color="secondary"
					onPress={resetPasswordHandler}
				>
					Reset Password
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
