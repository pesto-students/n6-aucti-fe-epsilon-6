import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomSearchBox from "./CustomSearchBox";
import CustomHitsComponent from "./CustomHitsComponent";
function Searchbar(props) {
  const dropdownRef = useRef();
  const initialState = true;
  const [showdropdown, setshowdropdown] = useState(initialState);

  // const handleClick = (event) => {
  //   if (dropdownRef && !dropdownRef.current.contains(event.target)) {
  //     setshowdropdown(!showdropdown);
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, []);

  return (
    <div ref={dropdownRef} className="flex-col justify-center pt-3">
      <CustomSearchBox />
      <div>
        {window.location.pathname === "/search" ? (
          <></>
        ) : (
          <CustomHitsComponent show={showdropdown} />
        )}
      </div>
    </div>
  );
}

export default Searchbar;
