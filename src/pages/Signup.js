import axios from "axios";
import { useState } from "react";
import "../styles/signup.css";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (email && username && password) {
				const response = await axios.post("http://localhost:4000/user/signup", {
					username: username,
					email: email,
					password: password,
				});
				console.log(response.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<main className="signup-page">
			<h1>S'inscrire</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					placeholder="Username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<input
					type="email"
					placeholder="Email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				{/* <input
					type="password"
					onChange={() => {
						setConfirm(e.target.value);
					}}
				/> */}
				<input type="submit" />
			</form>
		</main>
	);
};

export default Signup;
