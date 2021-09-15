import React, { useRef, useState, useEffect } from "react";

import CustomSearchBox from "./CustomSearchBox";
import CustomHitsComponent from "./CustomHitsComponent";
import { connectSearchBox } from "react-instantsearch-dom";
import { useDispatch } from "react-redux";
import { filterSearchResultAction } from "../../redux/actions/userActions";
import history from "../../routes/history";

function Searchbar({ refine }) {
	const dropdownRef = useRef(null);

	const [showdropdown, setshowdropdown] = useState(true);
	const dispatch = useDispatch();
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
		dispatch(filterSearchResultAction(null));
		refine(e.currentTarget.value);
		setshowdropdown(true);
	};

	const onClick = (id) => {
		// to={`/home/product/${id}`}
		history.push(`/home/product/${id}`);
		setshowdropdown(false);
	};

	return (
		<div ref={dropdownRef} className="flex-col justify-center pt-3">
			<CustomSearchBox handleType={handleType} />
			<div>
				{window.location.pathname === "/home/search" ? (
					<></>
				) : (
					<CustomHitsComponent handleClick={onClick} show={showdropdown} />
				)}
			</div>
		</div>
	);
}

export default connectSearchBox(Searchbar);
