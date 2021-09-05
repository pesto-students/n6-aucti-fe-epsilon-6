import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { useHistory, Link, Redirect } from "react-router-dom";
const CustomSearchBox = ({ refine }) => {
  const history = useHistory();
  return (
    <>
      <div className="flex font-sofia text-xlm-2 mx-2   inline-block ">
        <input
          className="font-sofia px-4 w-2/3"
          type="text"
          placeholder="enter seach value"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              history.push("/search");
            }
          }}
          onChange={(e) => refine(e.currentTarget.value)}
        />
        <div className="p-2" onClick={() => history.push("/search")}>
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
      </div>
    </>
  );
};

export default connectSearchBox(CustomSearchBox);
