import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Fav from "../components/Fav";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import Hero from "../components/Hero";

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
				`https://marvel-backend-cchau.herokuapp.com/characters?${searchInput}${skipPage}`
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
		<>
			<Hero title="Characters" />
			<main>
				<Search
					setSearch={setSearch}
					setPage={setPage}
					data={data}
					search={search}
					isLoading={isLoading}
				/>

				{isLoading ? (
					<Loading />
				) : data.count === 0 ? (
					<NotFound />
				) : (
					<div className="content-container">
						<Pagination setPage={setPage} page={page} count={data.count} />

						{data.results.map((el, i) => {
							return (
								<div key={el._id}>
									<Link to={`/characters/${el._id}`}>
										<div className="tile character">
											<div className="img-container">
												<img
													src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
													alt={el.name}
												/>
											</div>
											<div className="tile-text">
												<h2>{el.name}</h2>
											</div>

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
		</>
	);
};

export default Home;
