import "../styles/hero.css";

const Hero = ({ title }) => {
	return (
		<div className="hero">
			<h1>Marvel {title}</h1>
		</div>
	);
};

export default Hero;
