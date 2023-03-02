import { AuthContext } from "@/utility/AuthContext";
import { Button, Container, Text } from "@nextui-org/react";

import {
	selectisActive,
	setisActive,
	selectDisplayName,
	setDisplayName,
} from "@/store/authslice";

export default function About() {
	return (
		<Container fluid>
			{/* <Button onPress={updateData}>Update value</Button> */}
			<Text h3>About this</Text>
		</Container>
	);
}
