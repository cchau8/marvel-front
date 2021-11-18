import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Fav from "../components/Fav";

const Home = ({ favChar, setFavChar }) => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			const searchInput = search !== "" ? `&name=${search}` : "";
			const skipPage = `&skip=${page * 100 - 100}`;
			const response = await axios.get(
				`http://localhost:4000/characters?${searchInput}${skipPage}`
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

	return (
		<main>
			<h1>Characters</h1>
			<Search setSearch={setSearch} setPage={setPage} />
			{isLoading ? (
				<p>loading</p>
			) : (
				<div className="content-container">
					{data.results.map((el, i) => {
						return (
							<div key={el._id}>
								<Link to={`/characters/${el._id}`}>
									<div className="tile character">
										<img
											src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
											alt={el.name}
										/>
										<h2>{el.name}</h2>
										<Fav
											item={el}
											favState={favChar}
											setFavState={setFavChar}
											storageKey="favorites_characters"
										/>
									</div>
								</Link>
							</div>
						);
					})}
					<Pagination setPage={setPage} page={page} count={data.count} />
				</div>
			)}
		</main>
	);
};

export default Home;
