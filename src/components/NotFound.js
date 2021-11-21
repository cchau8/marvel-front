import React from "react";
import notFound from "../assets/not-found.png";
const NotFound = () => {
	return (
		<div className="not-found">
			<img src={notFound} alt="" />
			<h2>Content Not Found</h2>
		</div>
	);
};

export default NotFound;
