import React from "react";

function Button(props) {
	return (
		<button
			onClick={props.onClick}
			className="bg-yellow-300 px-9 py-1 mx-1 my-1 rounded w-90 h-30 "
		>
			<span className="font-sofia font-semibold text-xl">{props.text}</span>
		</button>
	);
}

export default Button;
