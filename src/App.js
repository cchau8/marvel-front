import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import CharacterPage from "./pages/CharacterPage";
import { useState } from "react";
import Favorites from "./pages/Favorites";
import Cookies from "js-cookie";

// import de fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faStar,
	faTimes,
	faSearch,
	faAngleLeft,
	faAngleDoubleLeft,
	faAngleRight,
	faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import Signup from "./pages/Signup";
library.add(
	faStar,
	faTimes,
	faSearch,
	faAngleLeft,
	faAngleDoubleLeft,
	faAngleRight,
	faAngleDoubleRight
);

function App() {
	const [favChar, setFavChar] = useState(
		localStorage.getItem("favorites_characters")
			? JSON.parse(localStorage.getItem("favorites_characters"))
			: []
	);
	const [favComics, setFavComics] = useState(
		localStorage.getItem("favorites_comics")
			? JSON.parse(localStorage.getItem("favorites_comics"))
			: []
	);
	const [token, setToken] = useState(Cookies.get("token" || ""));

	const setUser = (token) => {
		if (token) {
			Cookies.set("token", token);
		} else {
			Cookies.remove("token");
		}
		setToken(token);
	};

	return (
		<Router>
			<Header setUser={setUser} token={token} />

			<Routes>
				<Route path="/" element={<Home favChar={favChar} setFavChar={setFavChar} />} />
				<Route path="/characters/:characterId" element={<CharacterPage />} />
				<Route
					path="/comics"
					element={<Comics favComics={favComics} setFavComics={setFavComics} />}
				/>
				<Route
					path="/favorites"
					element={
						<Favorites
							favChar={favChar}
							setFavChar={setFavChar}
							favComics={favComics}
							setFavComics={setFavComics}
						/>
					}
				/>
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</Router>
	);
}

export default App;
