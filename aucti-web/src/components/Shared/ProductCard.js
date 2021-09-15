import React from "react";
import { Link } from "react-router-dom";
import history from "../../routes/history";

import LazyLoad from "react-lazy-load";

const ProductCard = (props) => {
	const { bidproduct } = props;

	let url = "/home/product/" + bidproduct.id;

	const handleProduct = () => {
		history.push(url);
	};

	// const refPlaceholder = React.useRef();

	// const removePlaceholder = () => {
	// 	refPlaceholder.current.remove();
	// };

	return (
		<div className="w-80 flex justify-center items-center">
			<div className="w-full p-4">
				<div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
					<Link to={url}>
						<div className="flex justify-center">
							{/* <div
								ref={refPlaceholder}
								className="h-36 w-36 mb-4 bg-gray-200 rounded-tr rounded-tl animate-pulse"
							></div> */}
							<LazyLoad
								// offsetBottom={-300}
								height={160}
							>
								<img
									src={bidproduct?.product_picture}
									className="object-cover object-center h-40 pb-4"
									// onLoad={removePlaceholder}
									// onError={removePlaceholder}
									alt={bidproduct?.title}
								/>
							</LazyLoad>
						</div>
						<div className="prod-title p-1">
							<p className="text-sm uppercase text-gray-900 font-bold">
								{bidproduct?.title}
							</p>
						</div>

						<div className="prod-info grid gap-2 p-1">
							<div className="flex flex-col text-gray-900">
								<p className="font-bold text-sm">
									{"₹ " + bidproduct?.base_price}
								</p>
								<p className="uppercase text-sm text-gray-400">Base Price</p>
							</div>
							<div className="flex flex-col  text-gray-900">
								<p className="font-bold text-sm">
									{"₹ " + bidproduct?.highest_price}
								</p>
								<p className="uppercase text-sm text-gray-400">Highest Bid</p>
							</div>
							<div className="flex flex-row  text-gray-900">
								<p className="uppercase text-sm text-gray-400 mr-2">
									Number of bids:
								</p>
								<p className="font-bold text-sm">{bidproduct?.bids}</p>
							</div>
						</div>
					</Link>
					<button
						className="bg-aucti hover:bg-auctiHover text-gray-900 font-bold py-2 px-4 rounded mt-2"
						onClick={handleProduct}
					>
						View Product
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
