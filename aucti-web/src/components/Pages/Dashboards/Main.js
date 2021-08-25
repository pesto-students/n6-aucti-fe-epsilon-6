import React from "react";
import Alert from "../../Shared/Alert";

function Main({ children }) {
	return (
		<main className="h-full w-full overflow-y-auto overflow-x-auto  ">
			<div>
				<Alert />
				{children}
			</div>
		</main>
	);
}

export default Main;
