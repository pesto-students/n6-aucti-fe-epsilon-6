import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
	getProductAction,
	getProductsPerUserAction,
} from "../../../redux/actions/productActions";

import Modal from "../../Shared/Modal";
import history from "../../../routes/history";
import { addBidAction } from "../../../redux/actions/buyerActions";
import { addWishlistAction } from "../../../redux/actions/wishlistActions";
import ConfirmModal from "../../Shared/ConfirmModal";

import ProductSkeltonPage from "./ProductSkeltonPage";
import Loader from "../../Shared/Loader";

const ProductPage = (props) => {
	const { product, user } = props;

	const [showModal, setShowModal] = useState(false);
	const [bidAmount, setBidAmount] = useState("");
	const [showModalWishlist, setShowshowModalWishlist] = useState(false);
	const [productState, setproductState] = useState(product);
	const [loading, setLoading] = useState(true);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		let id = props.match.params.id;
		if (user) {
			props.getProductPerUser(id, user.uid);
			setLoading(true);
		} else {
			props.getProduct(id);
			setLoading(true);
		}
	}, [props.match.params.id]);

	useEffect(() => {
		if (product !== productState) {
			setproductState(product);
			setLoading(false);
			setLoader(false);
		}
	}, [product]);

	useEffect(() => {
		if (product?.bid && product.bid.bid_price !== bidAmount) {
			setBidAmount(product?.bid?.bid_price);
		} else if (!product?.bid) {
			setBidAmount("");
		}
	}, [product]);

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
		setLoader(true);
	};

	const handleAddToWishlist = () => {
		if (!user) {
			history.push("/login");
		}
		setShowshowModalWishlist(true);
	};

	const addwishlist = () => {
		props.addToWishlist(user.uid, product.id);
		setShowshowModalWishlist(false);
		setLoader(true);
	};

	if (loading) {
		return <ProductSkeltonPage />;
	}

	if (loader) {
		return <Loader />;
	}

	return (
		<>
			<div className="flex xl:flex-row xs:flex-col justify-self-center xs:justify-center bg-white dark:bg-gray-800 xl:p-8 xs:p-6 m-8 rounded-lg shadow xl:w-3/4 xs:w-full">
				<div className="flex-none xl:w-72 xs:w-48 xl:mr-12 xs:mr-0">
					<img
						src={productState.product_picture}
						alt="shopping image"
						className=" rounded-lg inset-0 w-full object-cover"
					/>
				</div>
				<form className="flex-auto">
					<div className="flex flex-col">
						<h1 className="flex-auto text-2xl font-semibold dark:text-gray-50 xs:mt-8 xl:mt-0">
							{productState.title}
						</h1>
						<div className="flex flex-col mt-4">
							<div className="text-xl font-semibold text-gray-900 dark:text-gray-300">
								{"₹ " + productState.base_price}
							</div>
							<div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300">
								Base Price
							</div>
						</div>
						<div className="flex flex-col mt-4">
							<div className="text-xl font-semibold text-gray-900 dark:text-gray-300">
								{"₹ " + productState?.highest_bid}
							</div>
							<div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300 ">
								Highest Bid
							</div>
						</div>
						{productState.bid && (
							<div className="flex flex-col mt-4">
								<div className="text-xl font-semibold text-gray-900 dark:text-gray-300">
									{"₹ " + productState?.bid?.bid_price}
								</div>
								<div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300 ">
									Your Bid
								</div>
							</div>
						)}

						<div className="flex xl:flex-row xs:flex-col justify-start mt-4">
							<div className="flex-none text-lg font-medium text-gray-500 dark:text-gray-300 mr-2 ">
								Number of bids registered:
							</div>
							<div className="text-lg font-semibold text-gray-900 dark:text-gray-300">
								{productState.bids}
							</div>
						</div>
						<div className="flex flex-col mt-4">
							<div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300 ">
								{"Seller: " + productState.seller}
							</div>
						</div>
					</div>

					<div className="flex xl:flex-row xs:flex-col justify-between mb-4 text-sm font-medium mt-4">
						{user && user.role === "seller" ? (
							<></>
						) : (
							<>
								<button
									type="button"
									className="py-2 px-4 mr-10 bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
									onClick={handleBidNow}
								>
									{productState.bid ? "Edit Your Bid" : "Bid Now"}
								</button>
								{productState.wishlist ? (
									<div className="py-2  flex flex-row text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold ">
										<svg
											className="w-5 h-5 mx-1 fill-current"
											viewBox="0 0 20 20"
										>
											<path
												d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												clipRule="evenodd"
												fillRule="evenodd"
											></path>
										</svg>
										<span>Already added to wishlist!</span>
									</div>
								) : (
									<button
										type="button"
										className="xl:mt-0 xs:mt-4 py-2 px-4  bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
										onClick={handleAddToWishlist}
									>
										Add To Wishlist
									</button>
								)}
							</>
						)}
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-300">
						{productState.description}
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
							{"₹" + productState.base_price}
						</div>
					</div>
					<div className="flex flex-row mt-4">
						<div className="flex-none mr-2 text-sm font-medium text-gray-500 dark:text-gray-300">
							Highest Bid
						</div>
						<div className="text-sm font-semibold text-gray-900 dark:text-gray-300">
							{"₹" + productState.highest_bid}
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
								value={bidAmount}
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
			<ConfirmModal
				showModal={showModalWishlist}
				setShowModal={setShowshowModalWishlist}
			>
				<div className="">
					<div className="w-full h-full text-center">
						<div className="flex h-full flex-col justify-between">
							<svg className="w-5 h-5 mx-1 fill-current" viewBox="0 0 20 20">
								<path
									d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
									clipRule="evenodd"
									fillRule="evenodd"
								></path>
							</svg>
							<p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
								Please confirm to add the product to your wishlist.
							</p>
							<div className="flex items-center justify-between gap-4 w-full mt-8">
								<button
									type="button"
									className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
									onClick={() => {
										setShowshowModalWishlist(false);
									}}
								>
									Cancel
								</button>
								<button
									type="button"
									className="py-2 px-4  bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
									onClick={addwishlist}
								>
									Confirm
								</button>
							</div>
						</div>
					</div>
				</div>
			</ConfirmModal>
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
		getProductPerUser: (product_id, user_id) =>
			dispatch(getProductsPerUserAction(product_id, user_id)),
		addBid: (product_id, bid_price, user_id) =>
			dispatch(addBidAction(product_id, bid_price, user_id)),
		addToWishlist: (user_id, product_id) =>
			dispatch(addWishlistAction(user_id, product_id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
