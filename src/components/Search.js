import "../styles/search.css";

const Search = ({ setSearch, setPage }) => {
	const handleChange = (e) => {
		setSearch(e.target.value);
		setPage(1);
	};
	return (
		<div className="search-char">
			<input type="text" name="search-character" onChange={handleChange} />
		</div>
	);
};

export default Search;
