import React from "react";
import Footer from "../../Layouts/Footer";
import Alert from "../../Shared/Alert";

function Main({ children }) {
	return (
		<main className="h-screen w-full overflow-y-auto">
			<Alert />
			<div className="flex-grow container grid xl:px-6 lg:px-6 md:px-6 sm:px-6 mx-auto xs:px-0">
				{children}
			</div>
			<Footer></Footer>
		</main>
	);
}

export default Main;
