import React from "react";
import { Link } from "react-router-dom";

export const Banner = () => {
	return (
		<div className="flex flex-col xl:py-0 xs:py-10 w-80 xl:pr-4">
			<div className="w-full xl:mt-4 xl:mx-2 xl:mb-7  xs:mb-4 relative overflow-hidden bg-yellow-500 rounded-lg max-w-xs shadow-lg  py-10">
				<Link to="/home/special/hot_auctions">
					<svg
						className="absolute bottom-0 left-0 mb-8"
						viewBox="0 0 375 283"
						fill="none"
					>
						<rect
							x="159.52"
							y="175"
							width="152"
							height="152"
							rx="8"
							transform="rotate(-45 159.52 175)"
							fill="#f3c06b"
						></rect>
						<rect
							y="107.48"
							width="152"
							height="152"
							rx="8"
							transform="rotate(-45 0 107.48)"
							fill="#f3c06b"
						></rect>
					</svg>

					<div className="relative text-white px-3 pb-3 w-fill">
						{/* <span className="block opacity-75 -mb-1">Indoor</span> */}
						<div className="flex justify-center">
							<span className="block font-semibold text-xl">Hot Auctions</span>
						</div>
					</div>
				</Link>
			</div>

			<div className="w-full  xl:mx-2 xl:mb-7  xs:mb-4 relative overflow-hidden bg-blue-500 rounded-lg max-w-xs shadow-lg py-10">
				<Link to="/home/special/trending">
					<svg
						className="absolute bottom-0 left-0 mb-8"
						viewBox="0 0 375 283"
						fill="none"
					>
						<rect
							x="159.52"
							y="175"
							width="152"
							height="152"
							rx="8"
							transform="rotate(-45 159.52 175)"
							fill="#6da3fb"
						></rect>
						<rect
							y="107.48"
							width="152"
							height="152"
							rx="8"
							transform="rotate(-45 0 107.48)"
							fill="#6da3fb"
						></rect>
					</svg>

					<div className="relative text-white px-3 pb-3">
						<div className="flex justify-center">
							<span className="block font-semibold text-xl">Trending</span>
							{/* <span className="bg-white rounded-full text-blue-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
							$45.00
						</span> */}
						</div>
						<span className="block opacity-75 -mb-1">
							A Collection of most trending items
						</span>
					</div>
				</Link>
			</div>

			<div className=" w-full xl:mx-2  relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg  p-10">
				<Link to="/home/special/latest">
					<svg
						className="absolute bottom-0 left-0 mb-8"
						viewBox="0 0 375 283"
						fill="none"
					>
						<rect
							x="159.52"
							y="175"
							width="152"
							height="152"
							rx="8"
							transform="rotate(-45 159.52 175)"
							fill="#a17cf3"
						></rect>
						<rect
							y="107.48"
							width="152"
							height="152"
							rx="8"
							transform="rotate(-45 0 107.48)"
							fill="#a17cf3"
						></rect>
					</svg>

					<div className="relative text-white px-3 pb-3">
						<div className="flex justify-center">
							<span className="block font-semibold text-xl">
								Latest Products
							</span>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};
