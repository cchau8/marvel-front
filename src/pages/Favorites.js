import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import "../styles/favorites.css";
const Favorites = ({ favChar, setFavChar, favComics, setFavComics }) => {
	const handleDelete = (e, id, state, setState, storageKey) => {
		e.preventDefault();
		const copy = [...state];
		const filteredArr = copy.filter((el) => el._id !== id);
		setState(filteredArr);
		localStorage.setItem(storageKey, filteredArr);
	};

	return (
		<main className="fav-page">
			<div>
				<h1>Your favorites</h1>
				<div>
					<h2>Characters</h2>
					<div className="fav-container">
						{favChar.length === 0 ? (
							<p>Add charaters to your favorites</p>
						) : (
							favChar.map((el, i) => {
								return (
									<div key={el._id}>
										<Link to={`/characters/${el._id}`}>
											<div className="fav-tile">
												<img
													src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
													alt={el.name}
												/>
												<h2>{el.name}</h2>
												<div
													className="unfav"
													onClick={(e) => {
														handleDelete(
															e,
															el._id,
															favChar,
															setFavChar,
															"favorites_characters"
														);
													}}
												>
													<FontAwesomeIcon icon="times" />
												</div>
											</div>
										</Link>
									</div>
								);
							})
						)}
					</div>
				</div>
				<div>
					<h2>Comics</h2>
					<div className="fav-container">
						{favComics.length === 0 ? (
							<p>Add comics to your favorites</p>
						) : (
							favComics.map((el, i) => {
								return (
									<div key={el._id}>
										<div className="fav-tile">
											<img
												src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
												alt={el.title}
											/>
											<h2>{el.title}</h2>
											<div
												className="unfav"
												onClick={(e) => {
													handleDelete(
														e,
														el._id,
														favComics,
														setFavComics,
														"favorites_comics"
													);
												}}
											>
												<FontAwesomeIcon icon="times" />
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Favorites;
