import React from "react";

const profilemenu = () => {
  return (
    <div className=" absolute top-20 right-5  w-1/5 h-auto  p-2 border-2 bg-white">
      <ul>
        <li className="border-b-2">
          <a href="https://google.com" target="__blank">
            option 0
          </a>
        </li>
        <li className="border-b-2">option 1</li>
        <li className="border-b-2">option 2</li>
        <li className="border-b-2">option 3</li>
        <li className="border-b-2">option 4</li>
        <li className="border-b-2">option 5</li>
      </ul>
    </div>
  );
};

export default profilemenu;
