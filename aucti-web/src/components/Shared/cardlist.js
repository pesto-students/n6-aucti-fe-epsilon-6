import React, { useEffect } from "react";
import Card from "./card";
import Loader from "./Loader";
import { Link } from "react-router-dom";
const Cardlist = (props) => {
  const state = props.productlist;
  if (state !== undefined) {

    return (
      <>
        {state.map((item, index) => {
          let url = "/product/" + item.id;
          return (
            <Link to={url}>
              <Card
                key={index}
                product_title={item.title}
                img_url={item.product_picture}
                seller_name={item.seller_id}
                base_price={item.base_price}
                start_time={item.createdAt._seconds}
                id={item.id}
              />
            </Link>
          );
        })}
    
      </>
    );
  } 
  else 
  {
    return <Loader/>
  }
};

export default Cardlist;
