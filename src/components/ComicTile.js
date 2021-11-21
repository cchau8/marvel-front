import Fav from "./Fav";

const ComicTile = ({ favComics, setFavComics, item }) => {
	return (
		<div className="tile comic" key={item._id}>
			<div className="img-container">
				<img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} />
			</div>

			<div className="tile-text">
				<h2>{item.title}</h2>
				<p>
					{item.description
						? item.description
								.replaceAll("&#39;", "'")
								.replaceAll("&ndash;", "-")
								.replaceAll("<br>", "")
						: ""}
				</p>
			</div>
			<Fav
				item={item}
				favState={favComics}
				setFavState={setFavComics}
				storageKey="favorites_comics"
			/>
		</div>
	);
};

export default ComicTile;
