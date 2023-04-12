import { signOutAccount } from "@/utility/passAuth";
import { Navbar, Text, Avatar, Dropdown, Input, Link } from "@nextui-org/react";

import NextLink from "next/link";

import { selectUser } from "@/store/authslice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function SignedInNavbar() {
	const user = useAppSelector(selectUser);
	const router = useRouter();
	return (
		<Dropdown aria-labelledby="dropdown-user" placement="bottom-right">
			<Navbar.Item>
				<Dropdown.Trigger>
					<Avatar bordered as="button" color="gradient" size="md" />
				</Dropdown.Trigger>
			</Navbar.Item>
			<Dropdown.Menu
				aria-labelledby="dropdown-user-menu"
				color="secondary"
				onAction={(actionKey) => {
					switch (actionKey) {
						case "logout":
							signOut(auth)
								.then(() => {
									console.log("Sign out successful");
								})
								.catch((error) => {
									console.log("Signing out error");
									console.log(error);
								});
							break;
						case "settings":
							router.push("/settings");
							break;
						default:
							break;
					}
				}}
			>
				<Dropdown.Item
					textValue="dropdown-user-account"
					key="profile"
					css={{ height: "$18" }}
				>
					<Text b color="inherit" css={{ d: "flex" }}>
						Signed in as
					</Text>
					<Text b color="inherit" css={{ d: "flex" }}>
						{user?.email}
					</Text>
				</Dropdown.Item>
				<Dropdown.Item
					textValue="dropdown-user-settings"
					key="settings"
					withDivider
					color="primary"
				>
					Account Settings
				</Dropdown.Item>
				<Dropdown.Item
					textValue="dropdown-user-logout"
					key="logout"
					withDivider
					color="error"
				>
					Log Out
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
