import React from "react";
import { Star, Halfstar } from "./star";
const Rating = (props) => {
  const ratingfull = props.rating - (props.rating % 1);
  const ratinghalf = props.rating % 1;
  return (
    <>
      <div className=" py-2">
        <span className="text-seller_light">Seller </span>
        <span className="text-2xl text-seller_dark px-1">{props.sellername}</span>
        
          <span className="text-lg font-semibold text-seller_dark mx-1"> Rating </span>
          <span className="inline-flex text-yellow-300 mx-1">
            {(function () {
              let rows = [];
              for (let index = 0; index < ratingfull; index++) {
                rows.push(<Star />);
                if (index === ratingfull - 1 && ratinghalf > 0)
                  rows.push(<Halfstar />);
              }
              return rows;
            })()}
          </span>
          <span className="text-seller_dark font-semibold mx-4 ">
            {props.rating}
          </span>
        
      </div>
    </>
  );
};

export default Rating;
