import React from "react";

const LargeModal = (props) => {
	return (
		<>
			{props.showModal ? (
				<>
					<div className="justify-center pt-16 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative xl:w-auto xl:my-6 xl:mx-auto xl:max-w-6xl md:max-w-3xl xs:max-w-xs xs:mt-48">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-xl font-semibold">{props.title}</h3>
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
								<div className="relative p-6 flex-auto">
									<div className="my-4 text-blueGray-500 text-lg leading-relaxed">
										{props.children}
									</div>
								</div>
								{/*footer*/}
								{/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => props.setShowModal(false)}
									>
										Close
									</button>
									<button
										className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => props.setShowModal(false)}
									>
										Save Changes
									</button>
								</div> */}
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
};

export default LargeModal;
