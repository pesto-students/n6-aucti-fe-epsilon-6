import React from "react";
import { createPopper } from "@popperjs/core";

const Dropdown = (props) => {
	// dropdown props

	// bg colors
	let color = "white";
	let bgColor = "white";
	return (
		<>
			<div className="flex flex-wrap">
				<div className="w-full sm:w-6/12 md:w-4/12 px-4">
					<div className="relative inline-flex align-middle w-full">
						<div
							ref={props.popoverDropdownRef}
							className={
								(props.dropdownPopoverShow ? "block " : "hidden ") +
								(color === "white" ? "bg-white " : bgColor + " ") +
								"text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
							}
							style={{ minWidth: "12rem" }}
						>
							<a
								href="#pablo"
								className={
									"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
									(color === "white" ? " text-blueGray-700" : "text-white")
								}
								onClick={(e) => e.preventDefault()}
							>
								Action
							</a>
							<a
								href="#pablo"
								className={
									"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
									(color === "white" ? " text-blueGray-700" : "text-white")
								}
								onClick={(e) => e.preventDefault()}
							>
								Another action
							</a>
							<a
								href="#pablo"
								className={
									"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
									(color === "white" ? " text-blueGray-700" : "text-white")
								}
								onClick={(e) => e.preventDefault()}
							>
								Something else here
							</a>
							<div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
							<a
								href="#pablo"
								className={
									"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
									(color === "white" ? " text-blueGray-700" : "text-white")
								}
								onClick={(e) => e.preventDefault()}
							>
								Seprated link
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dropdown;
