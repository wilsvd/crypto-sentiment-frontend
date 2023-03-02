import { AuthContext } from "@/utility/AuthContext";
import { Navbar, Text, Avatar, Dropdown, Input, Link } from "@nextui-org/react";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
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
import { signOutAccount } from "@/utility/pass_auth";
import { Key } from "react";

// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) =>
// 		async ({ params }) => {
// 			// we can set the initial state from here

// 			console.log("State on server", store.getState());

// 			return {
// 				props: {
// 					isActive: useSelector(selectisActive),
// 					displayName: useSelector(selectDisplayName),
// 					email: useSelector(selectEmail),
// 					phoneNumber: useSelector(selectPhoneNumber),
// 					emailVerified: useSelector(selectEmail),
// 					photoURL: useSelector(selectPhotoURL),
// 				},
// 			};
// 		}
// );

function SignedInNavbar() {
	const { asPath } = useRouter();
	const email = useSelector(selectEmail);
	const dispatch = useDispatch();

	function handleActions(actionKey: Key) {
		console.log(actionKey);
		if (actionKey == "logout") {
			signOutAccount();
			dispatch(setisActive(false));
			dispatch(setDisplayName(""));
			dispatch(setEmail(""));
			dispatch(setEmailVerified(false));
			dispatch(setPhoneNumber(""));
			dispatch(setPhotoURL(""));
			console.log("Signing out");
		} else {
			console.log("Doing something else");
		}
	}
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
				onAction={(actionKey) => handleActions(actionKey)}
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

// export default dynamic(() => Promise.resolve(SignedInNavbar), { ssr: false });
export default SignedInNavbar;
