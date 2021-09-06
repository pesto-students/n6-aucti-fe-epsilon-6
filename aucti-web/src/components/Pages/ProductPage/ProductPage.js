import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FilterCheckBox from "../../Shared/filterCheckbox";
import ProductDetail from "../../Shared/ProductDetails";
import { getProductAction } from "../../../redux/actions/productActions";
import Loader from "../../Shared/Loader";

const ProductPage = (props) => {
	const productdata = props.product;

	useEffect(() => {
		let id = props.match.params.id;
		props.getProduct(id);
	}, []);

	if (productdata !== undefined) {
		return (
			<>
				{/* <div className="col-start-1 row-start-2 col-span-1 row-span-4 ">
					<h1></h1>
				</div>
				<div className="col-start-1 row-start-1 col-span-5 row-span-4 flex justify-center">
					<ProductDetail
						title={productdata.title}
						base_price={productdata.base_price}
						highest_bid={27000}
						// start_time={productdata.start_time._seconds}
						// end_time={productdata.end_time._seconds}
						bids_registered={7}
						product_description={productdata.description}
						product_picture={productdata.product_picture}
						id={props.match.params.id}
					/>
				</div> */}

				<div className="flex xl:flex-row xs:flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-12 m-8">
					<div className="flex-none xl:w-64 xs:w-48 xl:mr-12">
						<img
							src={productdata.product_picture}
							alt="shopping image"
							className=" rounded-lg inset-0 h-full object-cover"
						/>
					</div>
					<form className="flex-auto">
						<div className="flex flex-col">
							<h1 className="flex-auto text-2xl font-semibold dark:text-gray-50">
								{productdata.title}
							</h1>
							<div className="flex flex-col mt-4">
								<div className="text-xl font-semibold text-gray-900 dark:text-gray-300">
									{"₹" + productdata.base_price}
								</div>
								<div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300">
									Base Price
								</div>
							</div>
							<div className="flex flex-col mt-4">
								<div className="text-xl font-semibold text-gray-900 dark:text-gray-300">
									{"₹" + productdata.base_price}
								</div>
								<div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300 ">
									Highest Bid
								</div>
							</div>
							<div className="flex xl:flex-row xs:flex-col justify-start mt-4">
								<div className="flex-none text-lg font-medium text-gray-500 dark:text-gray-300 mr-2 ">
									Number of bids registered:
								</div>
								<div className="text-lg font-semibold text-gray-900 dark:text-gray-300">
									{productdata.base_price}
								</div>
							</div>
							<div className="flex flex-col mt-4">
								<div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300 ">
									Seller:
								</div>
							</div>
						</div>

						<div className="flex xl:flex-row xs:flex-col justify-between mb-4 text-sm font-medium mt-4">
							<button
								type="button"
								className="py-2 px-4 mr-10 bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
								// onClick={selectHighestBidder}
							>
								Bid Now
							</button>
							<button
								type="button"
								className="xl:mt-0 xs:mt-4 py-2 px-4  bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
								// onClick={selectHighestBidder}
							>
								Add To Wishlist
							</button>
						</div>
						<p className="text-sm text-gray-500 dark:text-gray-300">
							{productdata.description}
						</p>
					</form>
				</div>
			</>
		);
	} //end of if
	else return <Loader />;
};

const mapStateToProps = (state) => {
	return {
		product: state.productReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProduct: (id) => dispatch(getProductAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
