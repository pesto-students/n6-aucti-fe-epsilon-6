import React from "react";

const ProductSkeltonPage = () => {
	return (
		<>
			<div className="flex xl:flex-row xs:flex-col justify-self-center xs:justify-center bg-white dark:bg-gray-800 xl:p-8 xs:p-6 m-8 rounded-lg shadow xl:w-3/4 xs:w-full">
				<div className="flex-none xl:w-72 xs:w-48 xl:mr-12 xs:mr-0">
					<div className="w-72 h-72 pb-4 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
				</div>
				<form className="flex-auto">
					<div className="flex flex-col">
						<div className="h-8 w-1/2 rounded-sm bg-gray-200 animate-pulse"></div>
						<div className="flex flex-col mt-4">
							<div className="h-8 w-2/6 rounded-sm bg-gray-200 animate-pulse mt-2"></div>
							<div className="h-6 w-1/6 rounded-sm bg-gray-200 animate-pulse mt-1"></div>
						</div>
						<div className="flex flex-col mt-4">
							<div className="h-8 w-2/6 rounded-sm bg-gray-200 animate-pulse mt-2"></div>
							<div className="h-6 w-1/6 rounded-sm bg-gray-200 animate-pulse mt-1"></div>
						</div>

						<div className="flex xl:flex-row xs:flex-col justify-start mt-4">
							<div className="h-6 w-2/3 rounded-sm bg-gray-200 animate-pulse"></div>
						</div>
						<div className="flex flex-col mt-4">
							<div className="h-6 w-1/2 rounded-sm bg-gray-200 animate-pulse"></div>
						</div>
					</div>
					<div className="flex xl:flex-row xs:flex-col justify-between mb-4 text-sm font-medium mt-4">
						<div className="h-9 w-1/2 rounded-sm bg-gray-200 animate-pulse mr-12"></div>

						<div className="h-9 w-1/2 rounded-sm bg-gray-200 animate-pulse"></div>
					</div>

					<div className="h-6 rounded-sm bg-gray-200 animate-pulse"></div>
				</form>
			</div>
		</>
	);
};

export default ProductSkeltonPage;
