import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import CharacterPage from "./pages/CharacterPage";

import Favorites from "./pages/Favorites";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/characters/:characterId" element={<CharacterPage />} />
				<Route path="/comics" element={<Comics />} />
				<Route path="/favorites" element={<Favorites />} />
			</Routes>
		</Router>
	);
}

export default App;
