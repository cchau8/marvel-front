import axios from "axios";
import { useState, useEffect } from "react";

const Favorites = ({ favChar }) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const favData = [];
			for (let i = 0; i < favChar.length; i++) {
				const response = await axios.get(`http://localhost:4000/comics/${favChar[i]}`);
				favData.push(response.data);
			}
			console.log(favData);
			setData(favData);
		};
		fetchData();
		setIsLoading(false);
	}, [favChar]);

	return (
		<div>
			{isLoading ? (
				<p>loading</p>
			) : (
				<div>
					{data.map((el, i) => {
						return <span>{el.name}</span>;
					})}
				</div>
			)}
		</div>
	);
};

export default Favorites;
