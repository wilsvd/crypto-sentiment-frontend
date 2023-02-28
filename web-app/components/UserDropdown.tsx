import { AuthContext } from "@/utility/AuthContext";
import { Navbar, Text, Avatar, Dropdown, Input, Link } from "@nextui-org/react";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { useContext } from "react";

function SignedInNavbar() {
	const { asPath } = useRouter();

	const { user, setUser } = useContext(AuthContext);
	const { email, setEmail } = useContext(AuthContext);

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
				onAction={(actionKey) => console.log({ actionKey })}
			>
				{/* TODO: Refactor this code to use user context */}

				<Dropdown.Item key="profile" css={{ height: "$18" }}>
					<Text b color="inherit" css={{ d: "flex" }}>
						Signed in as
					</Text>
					<Text b color="inherit" css={{ d: "flex" }}>
						{email}
					</Text>
				</Dropdown.Item>
				<Dropdown.Item key="settings" withDivider>
					<Link href="/settings">My Settings</Link>
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

export default dynamic(() => Promise.resolve(SignedInNavbar), { ssr: false });
