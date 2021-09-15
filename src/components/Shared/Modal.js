import React from "react";

const Modal = (props) => {
	return (
		<>
			{props.showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-full my-6 mx-auto max-w-sm p-3">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-xl text-gray-900 font-semibold">
										{props.title}
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-gray-500 hover:text-black float-right text-xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => props.setShowModal(false)}
									>
										<span className="bg-transparent text-gray-500 hover:text-black h-6 w-6 text-xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto my-4">
									{/* <p className="my-4 text-blueGray-500 text-lg leading-relaxed"> */}
									{props.children}
									{/* </p> */}
								</div>
								{/*footer*/}
								{/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"> */}
								{/* <button
										className="text-gray-500 hover:text-gray-900  bg-opacity-75 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => props.setShowModal(false)}
									>
										Close
									</button>
									<button
										className="bg-aucti text-gray-900 hover:bg-auctiHover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => props.setShowModal(false)}
									>
										Save Changes
									</button> */}
								{/* <div className="flex items-center justify-between gap-4 w-full mt-8 border-t border-solid border-blueGray-200 rounded-b  p-3">
										<button
											type="button"
											className="py-2 px-4  bg-red-500 hover:bg-red-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
										>
											Delete
										</button>
										<button
											type="button"
											className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
											onClick={() => props.setShowModal(false)}
										>
											Cancel
										</button>
									</div> */}
								{/* </div> */}
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
};

export default Modal;
