import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const Comics = () => {
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
