import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import Hero from "../components/Hero";
import ComicTile from "../components/ComicTile";

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
				`https://marvel-backend-cchau.herokuapp.com/comics?${searchInput}${skipPage}`
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
			<Hero title="Comics" />
			<main>
				<Search
					setSearch={setSearch}
					setPage={setPage}
					isLoading={isLoading}
					data={data}
					search={search}
				/>
				{isLoading ? (
					<Loading />
				) : data.count === 0 ? (
					<NotFound />
				) : (
					<>
						<div className="content-container">
							<Pagination setPage={setPage} page={page} count={data.count} />

							{data.results.map((el, i) => {
								return (
									<ComicTile
										favComics={favComics}
										setFavComics={setFavComics}
										item={el}
									/>
								);
							})}
							<Pagination setPage={setPage} page={page} count={data.count} />
						</div>
					</>
				)}
			</main>
		</>
	);
};

export default Comics;
