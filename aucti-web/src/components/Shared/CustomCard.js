import React from "react";

const CustomCard = (props) => {
	const { bidproduct } = props;

	return (
		<div className="w-80 flex justify-center items-center">
			<div className="w-full p-4">
				<div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
					<div className="prod-img flex justify-center">
						<img
							src={bidproduct?.product_picture}
							className="object-cover object-center h-40 pb-4"
						/>
					</div>
					<div className="flex justify-center prod-title p-1">
						<p className="text-sm uppercase text-gray-900 font-bold">
							{bidproduct?.title}
						</p>
					</div>
					<div className="prod-info grid gap-10 p-1">
						<div className="flex flex-col  justify-center items-center text-gray-900">
							<p className="font-bold text-xl">
								{"₹ " + bidproduct?.base_price}
							</p>
							<p className="uppercase text-sm text-gray-400  p-1">Your bid</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomCard;
