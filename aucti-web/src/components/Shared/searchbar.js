import React from "react";

function Searchbar() {
  return (
    <div className="flex-col justify-center p-2">
      <div className="flex font-sofia text-xl hover:shadow-lg  m-2 mx-2   inline-block ">
        <input
          className="font-sofia px-4 w-2/3"
          type="text"
          placeholder="enter seach value"
        />
        <div className="p-2">
          <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
