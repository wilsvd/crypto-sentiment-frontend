import { Navbar, Text, Dropdown, Image } from "@nextui-org/react";

import { selectUser } from "@/store/authslice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

/**
 * Component for the signed-in user navbar, which includes a dropdown menu with options for user account settings and logout.
 * @returns {JSX.Element} JSX element of the signed-in user navbar
 */
export default function SignedInNavbar(): JSX.Element {
	const user = useAppSelector(selectUser); // Get the user information from the Redux store
	const router = useRouter(); // Get the Next.js router object to navigate to different pages

	/**
	 * Function to handle user actions from the dropdown menu.
	 * @param actionKey - The key of the selected action in the dropdown menu
	 */
	function handleAction(actionKey: string): void {
		switch (actionKey) {
			case "logout":
				// Sign out the user using Firebase authentication
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
				// Navigate to the user settings page using Next.js router
				router.push("/settings");
				break;
			default:
				break;
		}
	}

	return (
		<Dropdown aria-labelledby="dropdown-user" placement="bottom-right">
			<Navbar.Item>
				<Dropdown.Trigger css={{ cursor: "pointer" }}>
					<Image
						data-testid="dropdown-user"
						showSkeleton
						src="/user-icon.svg"
						width={32}
						height={32}
					/>
				</Dropdown.Trigger>
			</Navbar.Item>
			<Dropdown.Menu
				aria-labelledby="dropdown-user-menu"
				color="secondary"
				onAction={(actionKey) => {
					handleAction(actionKey.toString());
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
					data-testid="dropdown-user-account"
					textValue="dropdown-user-settings"
					key="settings"
					withDivider
					color="primary"
				>
					Account Settings
				</Dropdown.Item>
				<Dropdown.Item
					data-testid="dropdown-user-logout"
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
