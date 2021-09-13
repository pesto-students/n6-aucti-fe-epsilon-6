import React from "react";
import { Redirect } from "react-router-dom";
import Button from "./button";
import Rating from "./rating";

function Card(props) {
	const cardClick = () => {
		let url = "/product/" + props.id;
		return <Redirect to={url} />;
	};
	return (
		<div
			className="font-sofia max-w-sm max-h-sm rounded-md border overflow-hidden hover:shadow-lg pd-2 pt-2 mx-2 mb-2"
			onClick={cardClick}
		>
			<img
				src={props.img_url}
				alt="img"
				className="object-scale-down px-2 h-60 w-full"
			/>
			<div className="px-3">
				<div className="font-bold text-black-500 text-l ">
					{props.product_title}
				</div>
			</div>
			<ul className="mx-2 py-1 px-1">
				<li className="text-xl">
					<strong>{props.base_price}</strong>
				</li>
				<li className="text-lg text-seller_light">Base Price</li>
				<li>
					<span className="text-seller_light">Seller </span>
					<span className="text-2xl text-seller_dark px-1">
						{props.seller_name}
					</span>
					<Rating rating={2.5} />
				</li>
			</ul>

			<div className="flex flex-col justify-center">
				<Button text={"Show Details"} />
			</div>
			{/* <div className="px-4 py-2 grid grid-cols-2">
                <div onClick={props.fun} className="grid-col-start-1"><Button text={"Bid Now"}/> </div>
                <div onClick={props.fun} className="grid-col-start-2 mb-1  flex justify-end"><Favourite/></div>
            </div> */}
		</div>
	);
}

export default Card;
