import "../styles/pagination.css";

const Pagination = ({ setPage, page, count }) => {
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
					{Array.from(Array(Math.floor(count / 100) + 1), (e, i) => i + 1).map(
						(el, i) => {
							return (
								el >= page &&
								el <= page + 4 && (
									<button key={i} onClick={() => setPage(el)}>
										{el}
									</button>
								)
							);
						}
					)}
				</div>

				<button
					onClick={() => {
						page < Math.floor(count / 100) + 1 && setPage(page + 1);
					}}
					className={page === Math.floor(count / 100) + 1 ? "disabled" : ""}
				>
					next
				</button>
				<button
					onClick={() => {
						page < Math.floor(count / 100) + 1 && setPage(Math.floor(count / 100) + 1);
					}}
					className={page === Math.floor(count / 100) + 1 ? "disabled" : ""}
				>
					last
				</button>
			</div>
		</div>
	);
};

export default Pagination;
