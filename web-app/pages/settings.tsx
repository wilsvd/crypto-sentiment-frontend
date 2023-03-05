import { selectUser } from "@/store/authslice";
import { useAppSelector } from "@/store/hooks";
import { Container, Text } from "@nextui-org/react";
import Head from "next/head";

export default function AccountSettings() {
	const user = useAppSelector(selectUser);
	return (
		<Container fluid>
			<Head>
				<title>Account Settings</title>
				<meta
					property="og:Settings"
					content="Settings"
					key="settings"
				/>
			</Head>
			<Text h3>Account Settings</Text>

			{/* TODO: Improve UI for user account */}
			{user ? (
				<>
					<Text h5>Email: {user?.email}</Text>
					<Text h5>Name: {user?.displayName}</Text>
				</>
			) : (
				<>
					<Text h5>
						To view your account settings, sign in to your account.
					</Text>
				</>
			)}
		</Container>
	);
}
