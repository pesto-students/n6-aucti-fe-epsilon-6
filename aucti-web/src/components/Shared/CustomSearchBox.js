import React from "react";

import { Link } from "react-router-dom";
import { SearchIcon } from "../../assets/icons";
import history from "../../routes/history";

const CustomSearchBox = (props) => {
	return (
		<>
			{/* <div className="flex font-sofia text-xlm-2 mx-2   inline-block "> */}
			{/* onClick={() => history.push("/home/search")} */}
			<div className="absolute inset-y-0 flex items-center pl-2">
				<Link to="/home/search">
					<SearchIcon
						className="xl:w-4 xl:h-4 xs:w-3 xs:h-3 -mb-4"
						aria-hidden="true"
					/>
				</Link>
			</div>
			<input
				className="mt-1 xs:w-44 block xl:w-full lg:w-full md:w-full py-2 xl:px-8 xs:px-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm xs:text-xs"
				placeholder="Search for products"
				aria-label="Search"
				type="text"
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						history.push("/home/search");
					}
				}}
				onChange={props.handleType}
			/>
			{/* <input
					className="font-sofia px-4 w-2/3"
					placeholder="enter seach value"
				/> */}
			{/* <div className="p-2" onClick={() => history.push("/home/search")}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						fill="currentColor"
						className="bi bi-search"
						viewBox="0 0 16 16"
					>
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
					</svg>
				</div>
			</div> */}
		</>
	);
};

export default CustomSearchBox;
