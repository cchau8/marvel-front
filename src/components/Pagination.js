import "../styles/pagination.css";

const Pagination = ({ setPage, page, count }) => {
	const nbOfPages = Math.floor(count / 100) + 1;
	const fivePages =
		nbOfPages > 5
			? Array.from(Array(5), (e, i) => {
					if (page < nbOfPages - 4) {
						return page + i;
					} else {
						return nbOfPages - 4 + i;
					}
			  })
			: Array.from(Array(nbOfPages), (e, i) => {
					return page + i;
			  });
	return (
		<div className="pagination-container">
			<div className="pagination">
				<button
					onClick={() => {
						page > 1 && setPage(1);
					}}
					className={page === 1 ? "disabled" : ""}
				>
					first
				</button>
				<button
					onClick={() => {
						page > 1 && setPage(page - 1);
					}}
					className={page === 1 ? "disabled" : ""}
				>
					previous
				</button>
				<div className="page-nb">
					{fivePages.map((el, i) => {
						return (
							<button
								className={page === el ? "active" : ""}
								onClick={() => setPage(el)}
								key={i}
							>
								{el}
							</button>
						);
					})}
				</div>

				<button
					onClick={() => {
						page < nbOfPages && setPage(page + 1);
					}}
					className={page === nbOfPages ? "disabled" : ""}
				>
					next
				</button>
				<button
					onClick={() => {
						page < nbOfPages && setPage(nbOfPages);
					}}
					className={page === nbOfPages ? "disabled" : ""}
				>
					last
				</button>
			</div>
		</div>
	);
};

export default Pagination;
