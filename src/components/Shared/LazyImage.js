import React from "react";

const LazyImage = (props) => {
	return (
		<>
			<img
				src={props.src}
				className="object-cover object-center h-40 pb-4"
				onLoad={props.onLoad}
				onError={props.onError}
				alt={props.alt}
			/>
		</>
	);
};

export default LazyImage;
