import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addProductAction } from "../../../../redux/actions/sellerActions";
import Loader from "../../../Shared/Loader";

const SellerAddProduct = (props) => {
	const { user, addProductUpdate } = props;

	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [product_picture, setProduct_picture] = useState("");
	const [product_category, setProduct_category] = useState("");
	const [description, setDescription] = useState("");
	const [base_price, setBase_price] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		let valid = true;
		if (!title) {
			setError("Title cannot be blank");
			valid = false;
		} else if (!description) {
			setError("Description cannot be blank");
			valid = false;
		} else if (!base_price) {
			setError("Base Price cannot be blank");
			valid = false;
		} else if (isNaN(base_price)) {
			setError("Base Price cannot be text");
			valid = false;
		} else if (!product_category) {
			setError("Product category cannot be blank");
			valid = false;
		} else if (!product_picture) {
			setError("Product picture cannot be blank");
			valid = false;
		} else if (valid) {
			props.uploadProduct(
				{ user_id: user.uid, title, description, base_price, product_category },
				product_picture
			);
			setTitle("");
			setProduct_picture("");
			setDescription("");
			setBase_price("");
			setError("");
			setLoading(true);
		}
	};

	useEffect(() => {
		if (addProductUpdate.status === 500) {
			setLoading(false);
		}
	}, [addProductUpdate]);

	if (loading) {
		return <Loader></Loader>;
	}

	const fileData = () => {
		if (product_picture) {
			return (
				<div>
					<h4 className="text-xs text-gray-500">File Details:</h4>

					<p className="text-xs text-gray-500" data-testid="file_name">
						File Name: {product_picture.name}
					</p>

					<p className="text-xs text-gray-500">
						File Type: {product_picture.type}
					</p>

					<p className="text-xs text-gray-500">
						Last Modified:{" "}
						{product_picture?.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4></h4>
				</div>
			);
		}
	};

	return (
		<div className="flex flex-col justify-center">
			<div className="mt-10 sm:mt-0 pt-12 pb-32">
				<div className="md:grid md:grid-cols-1 md:gap-6 xs:gap-1">
					<div className="mt-5 md:mt-0 md:col-span-2 xs:col-span-2 flex xl:flex-row xs:flex-col justify-center">
						<form>
							<div className="overflow-hidden sm:rounded-md border-gray-400 border rounded">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-1 xl:gap-16 xs:gap-4">
										<div className="col-span-10 ">
											<label
												htmlFor="product_title"
												className="block text-sm font-medium text-gray-700"
											>
												Product Name
											</label>
											<input
												type="text"
												name="product_title"
												id="product_title"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
										</div>
										<div className="col-span-10">
											<label
												htmlFor="email-address"
												className="block text-sm font-medium text-gray-700"
											>
												Product Category
											</label>
											<select
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												data-testid="select-category"
												onChange={(e) => setProduct_category(e.target.value)}
											>
												<option data-testid="select-option" value={""}>
													-----Select-----
												</option>
												<option
													data-testid="select-option"
													value={"antiques_vintages"}
												>
													Antiques and Vintage
												</option>
												<option
													data-testid="select-option"
													value={"digital_art"}
												>
													Digital Art
												</option>
												<option
													data-testid="select-option"
													value={"autographed"}
												>
													Autographed
												</option>
												<option data-testid="select-option" value={"Other"}>
													Other
												</option>
											</select>
										</div>

										<div className="col-span-12">
											<label
												htmlFor="about"
												className="block text-sm font-medium text-gray-700"
											>
												Product Description
											</label>
											<div className="mt-1">
												<textarea
													data-testid="product-description"
													id="description"
													name="description"
													rows={3}
													className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													value={description}
													onChange={(e) => setDescription(e.target.value)}
												/>
											</div>
											<p className="mt-2 text-sm text-gray-500">
												Brief description about your product
											</p>
										</div>

										<div className="col-span-8">
											<label
												htmlFor="street-address"
												className="block text-sm font-medium text-gray-700"
											>
												Base Price
											</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
													<span className="text-gray-500 sm:text-sm">₹</span>
												</div>
												<input
													type="number"
													name="base_price"
													id="base_price"
													data-testid="product_base_price"
													className="mt-1 block w-full pl-7 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													placeholder="0.00"
													value={base_price}
													onChange={(e) => setBase_price(e.target.value)}
												/>
											</div>
										</div>

										<div className="col-span-12">
											<label className="block text-sm font-medium text-gray-700">
												Product picture
											</label>
											<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
												<div className="space-y-1 text-center">
													<svg
														className="mx-auto h-12 w-12 text-gray-400"
														stroke="currentColor"
														fill="none"
														viewBox="0 0 48 48"
														aria-hidden="true"
													>
														<path
															d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
													<div className="flex text-sm text-gray-600">
														<label
															htmlFor="file-upload"
															className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
														>
															<span>Upload a file</span>
															<input
																id="file-upload"
																name="file-upload"
																type="file"
																className="sr-only"
																onChange={(e) =>
																	setProduct_picture(e.target.files[0])
																}
															/>
														</label>
														<p className="pl-1">or drag and drop</p>
													</div>
													<p className="text-xs text-gray-500">
														PNG, JPG, GIF up to 10MB
													</p>
													{fileData()}
												</div>
											</div>
										</div>

										{/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="postal-code"
												className="block text-sm font-medium text-gray-700"
											>
												ZIP / Postal
											</label>
											<input
												type="text"
												name="postal-code"
												id="postal-code"
												autoComplete="postal-code"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												onChange={handleZip}
												value={zip}
											/>
										</div> */}
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-aucti hover:bg-auctiHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										onClick={handleSubmit}
									>
										Add Product
									</button>
								</div>
								<div className="text-right sm:px-6">
									<span
										data-testid="titleErr"
										id="titleErr"
										style={{ color: "red", fontSize: "12px" }}
									>
										{error}
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			{/** */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		addProductUpdate: state.addProductUpdate,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		uploadProduct: (product, product_picture) =>
			dispatch(addProductAction(product, product_picture)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerAddProduct);
