import { signOutAccount } from "@/utility/pass_auth";
import { Navbar, Text, Avatar, Dropdown, Input, Link } from "@nextui-org/react";

import NextLink from "next/link";

import { selectUser } from "@/store/authslice";
import { useAppSelector } from "@/store/hooks";

function SignedInNavbar() {
	const user = useAppSelector(selectUser);

	return (
		<Dropdown placement="bottom-right">
			<Navbar.Item>
				<Dropdown.Trigger>
					<Avatar
						bordered
						as="button"
						color="gradient"
						size="md"
						// src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
					/>
				</Dropdown.Trigger>
			</Navbar.Item>
			<Dropdown.Menu
				aria-label="User menu actions"
				color="secondary"
				onAction={(actionKey) =>
					actionKey == "logout" ? signOutAccount() : null
				}
			>
				{/* TODO: Refactor this code to use user context */}

				<Dropdown.Item key="profile" css={{ height: "$18" }}>
					<Text b color="inherit" css={{ d: "flex" }}>
						Signed in as
					</Text>
					<Text b color="inherit" css={{ d: "flex" }}>
						{user?.email}
					</Text>
				</Dropdown.Item>
				<Dropdown.Item key="settings" withDivider>
					<Link as={NextLink} href="/settings">
						Account Settings
					</Link>
				</Dropdown.Item>

				<Dropdown.Item key="help_and_feedback" withDivider>
					Help & Feedback
				</Dropdown.Item>
				<Dropdown.Item key="logout" withDivider color="error">
					Log Out
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default SignedInNavbar;
