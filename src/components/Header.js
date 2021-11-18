import React from "react";
import logo from "../assets/marvel-logo.png";
import "../styles/header.css";
import { Link } from "react-router-dom";
export const Header = () => {
	return (
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
					<Link to="/">Login</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
