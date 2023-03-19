import { signOutAccount } from "@/utility/pass_auth";
import { Navbar, Text, Avatar, Dropdown, Input, Link } from "@nextui-org/react";

import NextLink from "next/link";

import { selectUser } from "@/store/authslice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

function SignedInNavbar() {
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
				onAction={(actionKey) =>
					actionKey == "logout" ? signOutAccount() : null
				}
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
				>
					<Link as={NextLink} href="/settings">
						Account Settings
					</Link>
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

export default SignedInNavbar;
