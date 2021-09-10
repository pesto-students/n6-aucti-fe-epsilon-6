import React from "react";
import BannerSkelton from "../../Shared/BannerSkelton";
import ProductCardSkelton from "../../Shared/ProductCardSkelton";

const LandingPageSkelton = () => {
	return (
		<div>
			<div
				id="main"
				className="grid items-start xl:grid-cols-3 md:grid-cols-2 gap-1  xs:grid-cols-1"
			>
				<BannerSkelton />
				{Array(8)
					.fill()
					.map((n, key) => (
						<ProductCardSkelton key={key} />
					))}
			</div>
		</div>
	);
};

export default LandingPageSkelton;
