import React from "react";
import Button from "./button";
import Favourite from "./favourite";
import { Halfstar, Star } from "./star";

function Card(props) {
	return (
		<div className="max-w-sm max-h-sm rounded-2xl border overflow-hidden hover:shadow-lg  mx-2">
			<img
				src="https://source.unsplash.com/random"
				alt="img"
				className="w-full h-80"
			/>
			<div className="px-3 py-2">
				<div className="font-bold text-black-500 text-xl mb-2">
					Vintage Typewriter 1920s Remington Paragon
				</div>
			</div>
			<ul className="mx-2 py-1 px-1">
				<li className="text-3xl">
					<strong>4000</strong>
				</li>
				<li className="text-lg text-purple-700">Highest Bid</li>
				<li className="text-purple-500">seller Oracle of the seas</li>
				<li className="text-lg text-purple-700">Rating </li>
				<li className=" text-lg text-purple-700">
					<span className="inline-flex text-yellow-300 mx-1">
						<Star />
						<Star />
						<Star />
						<Star />
						<Halfstar />
					</span>
					4.5
				</li>
			</ul>

			<div className="px-4 py-2 grid grid-cols-2">
				<div onClick={props.fun} className="grid-col-start-1">
					<Button text={"Bid Now"} />{" "}
				</div>
				<div
					onClick={props.fun}
					className="grid-col-start-2 mb-1  flex justify-end"
				>
					<Favourite />
				</div>
			</div>
		</div>
	);
}

export default Card;
