import "../styles/search.css";

const Search = ({ setSearch }) => {
	const handleChange = (e) => {
		setSearch(e.target.value);
	};
	return (
		<div className="search-char">
			<input type="text" name="search-character" onChange={handleChange} />
		</div>
	);
};

export default Search;
