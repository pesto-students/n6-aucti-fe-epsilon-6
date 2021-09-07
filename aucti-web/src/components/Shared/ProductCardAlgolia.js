import React from "react";
import { Link } from "react-router-dom";
import history from "../../routes/history";

const ProductCardAlgolia = (props) => {
	const { bidproduct } = props;
	let url = "/home/product/" + bidproduct.objectID;

	const handleProduct = () => {
		history.push(url);
	};

	return (
		<div className="w-80 flex justify-center items-center">
			<div className="w-full p-4">
				<div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
					<Link to={url}>
						<div className="prod-img flex justify-center">
							<img
								src={bidproduct?.product_picture}
								className="object-cover object-center h-40 pb-4"
								// onClick={handleProduct}
							/>
						</div>
						<div className="prod-title p-1">
							<p className="text-sm uppercase text-gray-900 font-bold">
								{bidproduct?.title}
							</p>
							{/* <p className="uppercase text-sm text-gray-400  p-1">
								{bidproduct?.description}
							</p> */}
						</div>
						<div className="prod-info grid gap-10 p-1">
							<div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
								<p className="font-bold text-xl">
									{"₹ " + bidproduct?.base_price}
								</p>
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

export default ProductCardAlgolia;
