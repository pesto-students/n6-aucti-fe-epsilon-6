import React from "react";

const ProductCardSkelton = () => {
	return (
		<div className="w-80 flex justify-center items-center">
			<div className="w-full p-4">
				<div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
					<div className="h-36 pb-4 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>

					<div className="p-1">
						<div className="h-6 rounded-sm bg-gray-200 animate-pulse mt-4"></div>
					</div>

					<div className=" grid gap-2 p-1">
						<div className="flex flex-col">
							<div className="h-4 w-2/5 rounded-sm bg-gray-200 animate-pulse mb-1"></div>
							<div className="h-4 w-3/5 rounded-sm bg-gray-200 animate-pulse mb-1"></div>
						</div>
						<div className="flex flex-col  ">
							<div className="h-4  w-2/5 rounded-sm bg-gray-200 animate-pulse mb-1"></div>
							<div className="h-4 w-3/5 rounded-sm bg-gray-200 animate-pulse mb-1"></div>
						</div>
						<div className="flex flex-col">
							<div className="h-4 w-4/5 rounded-sm bg-gray-200 animate-pulse mb-1"></div>
						</div>
					</div>

					<div className="h-10 rounded-sm bg-gray-200 animate-pulse mt-1"></div>
				</div>
			</div>
		</div>
	);
};

export default ProductCardSkelton;
