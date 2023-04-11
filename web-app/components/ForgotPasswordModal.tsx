import { auth } from "@/config/firebase";
import { sendPasswordResetEmail } from "@firebase/auth";
import { Text, Input, Modal, Button } from "@nextui-org/react";
import { useState } from "react";

type Props = {
	visible: boolean;
	closeHandler: () => void;
};

export default function ForgotPasswordModal({ visible, closeHandler }: Props) {
	const [emailInput, setEmailInput] = useState("");
	const [message, setMessage] = useState("Please enter your email address.");

	function handleChange(event: { target: { name: string; value: string } }) {
		const { name, value } = event.target;
		name === "emailInput" ? setEmailInput(value) : null;
	}

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
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
	}
	return (
		<div>
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
		</div>
	);
}
