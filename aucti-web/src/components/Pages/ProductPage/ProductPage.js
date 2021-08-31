import React,{useEffect,useState} from "react";
import FilterCheckBox from "../../Shared/filterCheckbox";
import ProductDetail from "../../Shared/ProductDetails";
import axios from 'axios'
import Loader from "../../Shared/Loader";

const ProductPage = (props) => {
  let id = props.match.params.id
  const [temp, settemp] = useState()
  useEffect(() => {
    axios.get(`http://localhost:9000/.netlify/functions/api/products/${id}`)
    .then(response =>  settemp(response.data))
    .catch(e=>console.log(e))
  },[])

  if(temp!==undefined){
  return (
    <>
      <div class="col-start-1 row-start-2 col-span-1 row-span-4 ">
        <h1></h1>
      </div>
      <div class="col-start-1 row-start-1 col-span-5 row-span-4 flex justify-center">
        <ProductDetail
          title={temp.title}
          base_price={temp.base_price}
          highest_bid={27000}
          start_time={temp.start_time._seconds}
          end_time={temp.end_time._seconds}
          bids_registered={7}
          product_description={temp.description}
          product_picture = {temp.product_picture}
          id = { props.match.params.id}
        />
      </div>
    </>
  );
  }//end of if
  else return <Loader/>
};

export default ProductPage;
