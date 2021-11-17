import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/character-page.css";

const CharacterPage = () => {
	const { characterId } = useParams();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`http://localhost:4000/comics/${characterId}`);
			setData(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, [characterId]);

	return (
		<main>
			{isLoading ? (
				<p>loading</p>
			) : (
				<div className="character-page">
					<div className="char-main">
						<img
							src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
							alt={data.name}
						/>
						<div className="char-info">
							<h3>{data.name}</h3>
							<p>{data.description}</p>
						</div>
					</div>
					<h2 className="comics-title">{data.name} Comics</h2>
					<div className="char-comics">
						{data.comics.map((el, i) => {
							return (
								<div key={el._id} className="comic-tile">
									<img
										src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
										alt={el.title}
									/>
									<div>
										<h3>{el.title}</h3>
										{/* <p>
											{el.description
												? el.description
														.replaceAll("&#39;", "'")
														.replaceAll("&ndash;", "-")
												: ""}
										</p> */}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</main>
	);
};

export default CharacterPage;
