import React from "react";
import Footer from "../../Layouts/Footer";
import Alert from "../../Shared/Alert";

function Main({ children }) {
	return (
		<main className="h-screen w-full overflow-y-auto">
			<Alert />
			<div className="container grid px-6 mx-auto">{children}</div>
			<Footer></Footer>
		</main>
	);
}

export default Main;
