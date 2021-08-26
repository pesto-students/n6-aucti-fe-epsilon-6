import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Card from "./card";
import { productsLoaded } from "../../redux/actions/productActions";
const Cardlist = () => {
  const initialState = [];
  const [state, setstate] = useState(initialState);
  const state1 = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const result = axios
      .get("http://localhost:9000/.netlify/functions/api/products")
      .then((d) => {
        setstate(d.data);
        dispatch(productsLoaded(d.data));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      {state.map((item) => {
        return (
          <Card
            product_title={item.title}
            img_url={item.product_picture}
            seller_name={item.seller_id}
            base_price={item.base_price}
            start_time={item.createdAt._seconds}
          />
        );
      })}
      {/* {JSON.stringify(state1)} */}
     
    </>
  );
};

export default Cardlist;
