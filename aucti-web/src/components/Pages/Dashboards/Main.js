import React from "react";
import Alert from "../../Shared/Alert";

function Main({ children }) {
	return (
		<main className="h-screen w-full overflow-y-auto">
			<div className="container grid px-6 mx-auto">
				<Alert />
				{children}
			</div>
		</main>
	);
}

export default Main;
