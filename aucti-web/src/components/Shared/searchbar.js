import React from "react";
import {Link} from 'react-router-dom'
import CustomSearchBox from "./CustomSearchBox";
import CustomHitsComponent from "./CustomHitsComponent";
function Searchbar(props) {
  return (
    <div className="flex-col justify-center pt-3">
     <CustomSearchBox/>
      {window.location.pathname === '/search'? <></> :<CustomHitsComponent/>}
    </div>
  );
}


export default Searchbar;

