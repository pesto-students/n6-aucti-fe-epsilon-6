import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomSearchBox from "./CustomSearchBox";
import CustomHitsComponent from "./CustomHitsComponent";
import { Configure, connectSearchBox } from "react-instantsearch-dom";

function Searchbar({ refine }) {
	const dropdownRef = useRef(null);

	const [showdropdown, setshowdropdown] = useState(true);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current != null &&
				!dropdownRef.current.contains(event.target)
			) {
				setshowdropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
	}, [dropdownRef]);

	const handleType = (e) => {
		refine(e.currentTarget.value);
		setshowdropdown(true);
	};

	return (
		<div ref={dropdownRef} className="flex-col justify-center pt-3">
			<CustomSearchBox handleType={handleType} />
			<div>
				{window.location.pathname === "/home/search" ? (
					<></>
				) : (
					<CustomHitsComponent show={showdropdown} />
				)}
			</div>
		</div>
	);
}

export default connectSearchBox(Searchbar);
