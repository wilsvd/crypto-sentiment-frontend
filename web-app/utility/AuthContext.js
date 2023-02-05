import { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");

	const value = {
		user,
		setUser,
		email,
		setEmail,
		password,
		setPassword,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
