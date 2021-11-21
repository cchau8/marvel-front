import "../styles/search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
const Search = ({ setSearch, setPage, data, search, isLoading }) => {
	const [searchResult, setSearchResult] = useState({ results: [] });

	const handleChange = (e) => {
		setSearch(e.target.value);
		setPage(1);
		setSearchResult({ ...data });
	};
	return (
		<div className="search-char">
			<FontAwesomeIcon icon="search" className="search-i" />
			<input
				type="text"
				name="search-character"
				placeholder="search"
				onChange={handleChange}
			/>
			{!isLoading && (
				<div className="auto-complete">
					{search !== "" &&
						searchResult.results.map((el) => {
							return el.name
								? el.name.toLowerCase().includes(search.toLowerCase()) && (
										<Link to={`/characters/${el._id}`}>
											{el.name.replace(search, search)}
										</Link>
								  )
								: el.title.toLowerCase().includes(search.toLowerCase()) && (
										<Link to={`/characters/${el._id}`}>
											{el.title.replace(search, search)}
										</Link>
								  );
						})}
				</div>
			)}
		</div>
	);
};

export default Search;
