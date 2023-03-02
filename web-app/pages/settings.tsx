import { Container, Text } from "@nextui-org/react";

import {
	selectisActive,
	setisActive,
	selectDisplayName,
	setDisplayName,
	selectEmail,
	setEmail,
	selectEmailVerified,
	setEmailVerified,
	selectPhoneNumber,
	setPhoneNumber,
	selectPhotoURL,
	setPhotoURL,
} from "@/store/authslice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "@/store/store";

export default function Settings() {
	const isActive = useSelector(selectisActive);
	const displayName = useSelector(selectDisplayName);
	const email = useSelector(selectEmail);
	const emailVerified = useSelector(selectEmailVerified);
	const phoneNumber = useSelector(selectPhoneNumber);
	const photoURL = useSelector(selectPhotoURL);
	const dispatch = useDispatch();

	return (
		<Container fluid>
			<Text h3>Settings</Text>
			<Text h3>{isActive}</Text>
			<Text h3>{displayName}</Text>
			<Text h3>{email}</Text>
			<Text h3>{emailVerified}</Text>
			<Text h3>{phoneNumber}</Text>
			<Text h3>{photoURL}</Text>
		</Container>
	);
}
