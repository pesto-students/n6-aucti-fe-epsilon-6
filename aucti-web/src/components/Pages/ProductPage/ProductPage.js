import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FilterCheckBox from "../../Shared/filterCheckbox";
import ProductDetail from "../../Shared/ProductDetails";
import { getProductAction } from "../../../redux/actions/productActions";
import Loader from "../../Shared/Loader";
import Modal from "../../Shared/Modal";
import history from "../../../routes/history";
import { addBidAction } from "../../../redux/actions/buyerActions";

const ProductPage = (props) => {
	const { product, user } = props;

	const [showModal, setShowModal] = useState(false);
	const [bidAmount, setBidAmount] = useState("");

	useEffect(() => {
		let id = props.match.params.id;
		props.getProduct(id);
	}, []);
	const handleBidNow = () => {
		if (!user) {
			history.push("/login");
		}
		setShowModal(true);
	};
	const handlePrice = (e) => {
		setBidAmount(e.target.value);
	};
	const handleAddBid = (e) => {
		e.preventDefault();
		props.addBid(product.id, bidAmount, user.uid);
		setBidAmount("");
		setShowModal(false);
	};

	if (!product) {
		return <Loader />;
	}

	return (
		<>
			<div className="flex xl:flex-row xs:flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-12 m-8">
				<div className="flex-none xl:w-64 xs:w-48 xl:mr-12">
					<img
						src={product.product_picture}
						alt="shopping image"
						className=" rounded-lg inset-0 h-full object-cover"
					/>
				</div>
				<form className="flex-auto">
					<div className="flex flex-col">
						<h1 className="flex-auto text-2xl font-semibold dark:text-gray-50">
							{product.title}
						</h1>
						<div className="flex flex-col mt-4">
							<div className="text-xl font-semibold text-gray-900 dark:text-gray-300">
								{"₹ " + product.base_price}
							</div>
							<div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300">
								Base Price
							</div>
						</div>
						<div className="flex flex-col mt-4">
							<div className="text-xl font-semibold text-gray-900 dark:text-gray-300">
								{"₹ " + product?.highest_bid}
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
								{product.bids}
							</div>
						</div>
						<div className="flex flex-col mt-4">
							<div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300 ">
								{"Seller: " + product.seller}
							</div>
						</div>
					</div>

					<div className="flex xl:flex-row xs:flex-col justify-between mb-4 text-sm font-medium mt-4">
						<button
							type="button"
							className="py-2 px-4 mr-10 bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
							onClick={handleBidNow}
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
						{product.description}
					</p>
				</form>
			</div>
			<Modal
				showModal={showModal}
				title={"Bid Now!"}
				setShowModal={setShowModal}
			>
				<form action="#" method="POST">
					<div className="flex flex-row ">
						<div className="flex-none mr-2 text-sm font-medium text-gray-500 dark:text-gray-300">
							Base Price
						</div>
						<div className="text-sm font-semibold text-gray-900 dark:text-gray-300">
							{"₹" + product.base_price}
						</div>
					</div>
					<div className="flex flex-row mt-4">
						<div className="flex-none mr-2 text-sm font-medium text-gray-500 dark:text-gray-300">
							Highest Bid
						</div>
						<div className="text-sm font-semibold text-gray-900 dark:text-gray-300">
							{"₹" + product.highest_bid}
						</div>
					</div>
					<div className="mt-4">
						<label
							htmlFor="price"
							className="block text-sm font-medium text-gray-700"
						>
							Your Bid Price
						</label>
						<div className="mt-1 relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<span className="text-gray-500 sm:text-sm">₹</span>
							</div>
							<input
								type="number"
								name="price"
								id="price"
								className="mt-1 block w-full pl-7 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="0.00"
								onChange={handlePrice}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between gap-4 w-full pt-12">
						<button
							type="button"
							className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
							onClick={() => {
								setShowModal(false);
							}}
						>
							Cancel
						</button>
						<button
							type="button"
							className="py-2 px-4  bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
							onClick={handleAddBid}
						>
							Add Bid
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		product: state.productReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProduct: (id) => dispatch(getProductAction(id)),
		addBid: (product_id, bid_price, user_id) =>
			dispatch(addBidAction(product_id, bid_price, user_id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
