import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/character-page.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from "../components/Loading";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
		slidesToSlide: 4, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};

const CharacterPage = () => {
	const { characterId } = useParams();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://marvel-backend-cchau.herokuapp.com/comics/${characterId}`
			);
			setData(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, [characterId]);

	return (
		<div className="character-page">
			{isLoading ? (
				<Loading />
			) : (
				<div className="character-content">
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
					<h4>{data.name} Comics</h4>

					<Carousel responsive={responsive} itemClass="comic-tile">
						{data.comics.map((el, i) => {
							return (
								<div key={el._id}>
									<img
										src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
										alt={el.title}
									/>
									<h5>{el.title}</h5>
								</div>
							);
						})}
					</Carousel>
				</div>
			)}
		</div>
	);
};

export default CharacterPage;
