import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import CharacterPage from "./pages/CharacterPage";
import { useState } from "react";
import Favorites from "./pages/Favorites";

// import de fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faStar, faTimes);

function App() {
	const [favChar, setFavChar] = useState(
		localStorage.getItem("favorites_characters")
			? localStorage.getItem("favorites_characters").split(",")
			: []
	);
	const [favComics, setFavComics] = useState(
		localStorage.getItem("favorites_comics")
			? localStorage.getItem("favorites_comics").split(",")
			: []
	);

	return (
		<Router>
			<Header />

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
			</Routes>
		</Router>
	);
}

export default App;
