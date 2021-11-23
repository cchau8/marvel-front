import "../styles/search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
const Search = ({ setSearch, setPage, data, search, isLoading }) => {
	const [searchResult, setSearchResult] = useState({ results: [] });
	const [showResult, setShowResult] = useState(false);
	const handleChange = (e) => {
		setSearch(e.target.value);
		setPage(1);
		setSearchResult({ ...data });
		setShowResult(true);
	};
	const searchRef = useRef();
	// Detect click outside the modal
	useEffect(() => {
		const handler = (e) => {
			if (showResult && !searchRef.current?.contains(e.target)) {
				setShowResult(false);
				const body = document.querySelector("body");
				body.style.overflow = "auto";
			}
		};
		window.addEventListener("click", handler);
		return () => {
			window.removeEventListener("click", handler);
		};
	}, [showResult, setShowResult]);
	return (
		<div className="search-char">
			<FontAwesomeIcon icon="search" className="search-i" />
			<input
				type="text"
				name="search-character"
				placeholder="search"
				onChange={handleChange}
			/>
			{!isLoading && showResult && (
				<div className="auto-complete" ref={searchRef}>
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
