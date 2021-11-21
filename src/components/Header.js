import React from "react";
import logo from "../assets/marvel-logo.png";
import "../styles/header.css";
import "../styles/login-modal.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
export const Header = ({ setUser, token }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<header>
				<div className="nav-container">
					<nav>
						{/* insérer les links pour les personnages et les comics */}
						<Link to="/">Characters</Link>
						<Link to="/comics">Comics</Link>
					</nav>
					<img src={logo} alt="marvel-logo" />
					<nav>
						{/* insérer les links/button pour les favorsi et signup/login */}
						<Link to="/favorites">Favorites</Link>
						{token ? (
							<p className="connected">Connected</p>
						) : (
							<button
								onClick={() => {
									setShowModal(true);
									const body = document.querySelector("body");
									body.style.overflow = "hidden";
								}}
							>
								Login
							</button>
						)}
					</nav>
				</div>
			</header>
			{showModal && (
				<LoginModal setUser={setUser} setShowModal={setShowModal} showModal={showModal} />
			)}
		</>
	);
};

export default Header;
