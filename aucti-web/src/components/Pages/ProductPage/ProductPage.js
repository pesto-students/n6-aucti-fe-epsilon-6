import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FilterCheckBox from "../../Shared/filterCheckbox";
import ProductDetail from "../../Shared/ProductDetails";
//import { getProductAction } from "../../../redux/actions/productActions";
import { getProductPerUserAction,getProductAction } from "../../../redux/actions/productActions";

import Loader from "../../Shared/Loader";

const ProductPage = (props) => {
  const productdata = props.product;
  console.log('from' , productdata)
  let product_id = props.match.params.id;
  let user_id = localStorage.getItem("user_id");
  useEffect(() => {
    props.getProduct(product_id, user_id);
  }, []);

  if (props.product !== undefined) {
     console.log('props len',props.product.length)
    return (
      <>
        <div className="col-start-1 row-start-2 col-span-1 row-span-4 ">
          <h1></h1>
        </div>
        <div className="col-start-1 row-start-1 col-span-5 row-span-4 flex justify-center">
            <ProductDetail
            title={productdata.propduct.title}
            base_price={productdata.propduct.base_price}
            bid_price={productdata.bid.bid_price}
            highest_bid={productdata.highest_bid}
            // start_time={productdata.start_time._seconds}
            // end_time={productdata.end_time._seconds}
            bids_registered={productdata.highest_bid %100}
            product_description={productdata.propduct.description}
            product_picture={productdata.propduct.product_picture}
            id={props.match.params.id}
            wishlist={productdata.wishlist}
          />
        </div>
      </>
    );

  } //end of if
  else {
    console.log('props len',props.product.length);
    return (<Loader />);
  }

};

const mapStateToProps = (state) => {
  return {
    product: state.productPerUserReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (product_id, user_id) =>
      dispatch(getProductPerUserAction(product_id, user_id)),
  };
};  

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
