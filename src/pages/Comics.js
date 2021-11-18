import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Fav from "../components/Fav";

const Comics = ({ favComics, setFavComics }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	useEffect(() => {
		const fetchData = async () => {
			const searchInput = search !== "" ? `&title=${search}` : "";
			const skipPage = `&skip=${page * 100 - 100}`;
			const response = await axios.get(
				`http://localhost:4000/comics?${searchInput}${skipPage}`
			);
			setData(response.data);
			setIsLoading(false);
		};
		fetchData();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [search, page]);

	const checkFav = (id) => {
		if (favComics.includes(id)) {
			return true;
		} else {
			return false;
		}
	};

	const handleFav = (e, item) => {
		e.preventDefault();
		const favs = [...favComics];
		if (!favs.some((el) => el._id === item._id)) {
			favs.push(item);
			setFavComics(favs);
			localStorage.setItem("favorites_comics", JSON.stringify(favs));
		} else {
			const filtered = favs.filter((el) => el._id !== item._id);
			setFavComics(filtered);
			localStorage.setItem("favorites_comics", filtered);
		}
	};
	return (
		<main>
			<h1>Comics</h1>
			<Search setSearch={setSearch} />
			{isLoading ? (
				<p>loading</p>
			) : (
				<div className="content-container">
					{data.results.map((el, i) => {
						return (
							<div className="tile comic" key={el._id}>
								<img
									src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
									alt={el.title}
								/>
								<h2>{el.title}</h2>
								<p>
									{el.description
										? el.description
												.replaceAll("&#39;", "'")
												.replaceAll("&ndash;", "-")
												.replaceAll("<br>", "")
										: ""}
								</p>
								<Fav
									item={el}
									favState={favComics}
									setFavState={setFavComics}
									storageKey="favorites_comics"
								/>
							</div>
						);
					})}
					<Pagination setPage={setPage} page={page} count={data.count} />
				</div>
			)}
		</main>
	);
};

export default Comics;
