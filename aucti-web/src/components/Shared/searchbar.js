import React from "react";
import { SearchBox } from "react-instantsearch-dom";
function Searchbar(props) {
  return (
    <div className="flex-col justify-center pt-3">
      <div className="flex font-sofia text-xlm-2 mx-2   inline-block ">
        <SearchBox  />
      </div>
    </div>
  );
}

export default Searchbar;

