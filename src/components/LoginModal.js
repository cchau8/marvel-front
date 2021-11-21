import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginModal = ({ setUser, setShowModal, showModal }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const modalRef = useRef(null);

	const closeModal = () => {
		setShowModal(false);
		const body = document.querySelector("body");
		body.style.overflow = "auto";
	};
	// Detect click outside the modal
	useEffect(() => {
		const handler = (e) => {
			if (showModal && !modalRef.current?.contains(e.target)) {
				setShowModal(false);
				const body = document.querySelector("body");
				body.style.overflow = "auto";
			}
		};
		window.addEventListener("click", handler);
		return () => {
			window.removeEventListener("click", handler);
		};
	}, [showModal, setShowModal]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post("http://localhost:4000/user/login", {
			email: email,
			password: password,
		});
		setUser(response.data.token);
		closeModal();
		try {
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="modal">
			<div className="modal-content" ref={modalRef}>
				<button
					onClick={() => {
						closeModal();
					}}
				>
					<FontAwesomeIcon icon="times" />{" "}
				</button>
				<h1>Se connecter</h1>
				<form onSubmit={(e) => handleSubmit(e)}>
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
					<input type="submit" />
					<Link to="/signup" onClick={closeModal}>
						Pas encore de compte ? Inscris-toi !
					</Link>
				</form>
			</div>
		</div>
	);
};

export default LoginModal;
