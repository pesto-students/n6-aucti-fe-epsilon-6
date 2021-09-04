import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FilterCheckBox from "../../Shared/filterCheckbox";
import ProductDetail from "../../Shared/ProductDetails";
import { getProductAction } from "../../../redux/actions/productActions";
import Loader from "../../Shared/Loader";

const ProductPage = (props) => {
  let id = props.match.params.id;

  const productdata = props.product;

  useEffect(() => {
    props.getProduct(id);
  }, []);

  if (productdata !== undefined) {
    return (
      <>
        <div className="col-start-1 row-start-2 col-span-1 row-span-4 ">
          <h1></h1>
        </div>
        <div className="col-start-1 row-start-1 col-span-5 row-span-4 flex justify-center">
          <ProductDetail
            title={productdata.title}
            base_price={productdata.base_price}
            highest_bid={27000}
            // start_time={productdata.start_time._seconds}
            // end_time={productdata.end_time._seconds}
            bids_registered={7}
            product_description={productdata.description}
            product_picture={productdata.product_picture}
            id={props.match.params.id}
          />
        </div>
      </>
    );
  } //end of if
  else return <Loader />;
};

const mapStateToProps = (state) => {
  return {
    product: state.productReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProductAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
