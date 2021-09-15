import React from "react";
import { Star, Halfstar } from "./star";
const Rating = (props) => {
  const ratingfull = props.rating - (props.rating % 1);
  const ratinghalf = props.rating % 1;

  const calculate_rating=()=>{
    let rows = [];
    for (let index = 0; index < ratingfull; index++) {
      rows.push(<Star  key={index} />);
      if (index === ratingfull - 1 && ratinghalf > 0)
        rows.push(<Halfstar  key={index+1} />);
    }
    return rows;
  }
  return (
    <>
      {/* <div className=" py-2">  */}
       
          <span className="text-lg font-semibold text-seller_dark mx-1"> Rating </span>
          <span className="inline-flex text-yellow-300 mx-1">
          
                 {calculate_rating()} 
               
          </span>
          <span className="text-seller_dark font-semibold mx-4 ">
            {props.rating}
          </span>
        
      {/* </div> */}
    </>
  );
};

export default Rating;
