import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "../styles/favorites.css";
const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
		slidesToSlide: 4, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};
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

				<h2>Characters</h2>
				<Carousel responsive={responsive}>
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
											<h3>{el.name}</h3>
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
				</Carousel>

				<div>
					<h2>Comics</h2>
					<Carousel responsive={responsive}>
						{favComics && favComics.length === 0 ? (
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
											<h3>{el.title}</h3>
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
					</Carousel>
				</div>
			</div>
		</main>
	);
};

export default Favorites;
