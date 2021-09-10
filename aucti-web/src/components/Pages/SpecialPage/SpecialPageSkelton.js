import React from "react";
import ProductCardSkelton from "../../Shared/ProductCardSkelton";

const SpecialPageSkelton = () => {
	return (
		<div>
			<div
				id="main"
				className="grid items-start xl:grid-cols-3 md:grid-cols-2 gap-1  xs:grid-cols-1"
			>
				{Array(6)
					.fill()
					.map((n, key) => (
						<ProductCardSkelton key={key} />
					))}
			</div>
		</div>
	);
};

export default SpecialPageSkelton;
