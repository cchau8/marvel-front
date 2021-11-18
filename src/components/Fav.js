import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Fav = ({ item, favState, setFavState, storageKey }) => {
	const checkFav = (id) => {
		if (favState.some((el) => el._id === id)) {
			return true;
		} else {
			return false;
		}
	};

	const handleFav = (e, item) => {
		e.preventDefault();
		const favs = [...favState];
		if (!favs.some((el) => el._id === item._id)) {
			favs.push(item);
			setFavState(favs);
			localStorage.setItem(storageKey, JSON.stringify(favs));
		} else {
			const filtered = favs.filter((el) => el._id !== item._id);
			setFavState(filtered);
			localStorage.setItem(storageKey, filtered);
		}
	};

	return (
		<div
			className={`fav-btn${checkFav(item._id) ? " favorited" : " not-fav"}`}
			onClick={(e) => {
				handleFav(e, item);
			}}
		>
			<FontAwesomeIcon icon="star" />
		</div>
	);
};

export default Fav;
