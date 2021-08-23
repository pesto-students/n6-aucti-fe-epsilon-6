import React from "react";

function Main({ children }) {
	return (
		<main className="h-full overflow-y-auto">
			<div className="container grid px-6 mx-auto">
				<div
					className="px-4 py-3 w-auto min-w-full m-5 leading-normal text-blue-700 bg-blue-100 rounded-lg"
					role="alert"
				>
					<p>A simple alert with text</p>
				</div>

				{children}
			</div>
		</main>
	);
}

export default Main;
