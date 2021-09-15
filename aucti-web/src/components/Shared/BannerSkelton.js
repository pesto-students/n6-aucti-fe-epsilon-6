import React from "react";

const BannerSkelton = () => {
	return (
		<div className="flex flex-col xl:py-0 xs:py-10 w-80 xl:pr-4">
			<div className="h-32 rounded-lg bg-gray-200 animate-pulse mt-4"></div>
			<div className="h-32 rounded-lg bg-gray-200 animate-pulse mt-6"></div>
			<div className="h-32 rounded-lg bg-gray-200 animate-pulse mt-6"></div>
		</div>
	);
};

export default BannerSkelton;
