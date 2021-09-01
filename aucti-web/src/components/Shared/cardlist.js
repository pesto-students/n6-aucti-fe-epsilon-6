import React from "react";
import { useSelector } from "react-redux";
import Card from "./card";
const Cardlist = () => {
  const state = useSelector((state) => state.productReducer);
  //  const state1 =state.map(item => { if(item !=null) return item})
  const state1 = state[1];

  return (
    <>
      {/* {state1.map((item, index) => {
        return (  
          <Card
            key={index}
            product_title={item.title}
            img_url={item.product_picture}
            seller_name={item.seller_id}
            base_price={item.base_price}
            start_time={item.createdAt._seconds}
          />
        );
      })}
  
      {JSON.stringify(state1)} */}
    </>
  );
};

export default Cardlist;
