import React,{useState} from "react";
import axios from "axios";
import Button from "./button";
import Rating from "./rating";
import { Facebook, Instagram, Twitter, Whatsapp } from "./socialmedia";
import { Star, Halfstar } from "./star";
import { timestampconvert } from "./timestampconvert";
import Bidform from './bidform'
import Modal from "./Modal";

function ProductDetails(props) {
  var initialState = false
  const [showModal, setShowModal] = useState(initialState)
  const  addbid =()=>{setShowModal(true)}

  const addwishlist = (id) =>{
    let user_id=localStorage.getItem('user_id')
    const obj = { user_id:user_id, product_id:id }
    axios.post('http://localhost:9000/.netlify/functions/api/wishlists' ,obj)
    .then(()=>{alert('added to wishlist')})
    .catch(()=>{console.log('not added to wishlist')})
      
  }
  return (<>
    <div className="m-5 p-4 w-4/5 h-7/10   border  font-sofia">
      <div className="flex justify-center">
        <div className="m-auto mt-6  w-2/6">
          <img
            src={props.product_picture}
            alt="img"
            className="object-scale-down w-full h-1/2 px-2 py-2"
          />
          <span className="w-24 h-5 flex justify-between  mx-auto">
            <Facebook />
            <Instagram />
            <Twitter />
            <Whatsapp />
          </span>
        </div>

        <div className="m-2 flex flex-col w-4/6  font-sofia">
          <div className="ml-1 mr-2 py-3 text-3xl font-bold">{props.title}</div>

          <div className="ml-1 py-1 text-5xl font-bold">
            ₹{props.base_price}
          </div>
          <div className="ml-1  text-2xl font-semibold text-seller_light">
            Base Price
          </div>

          <div className="ml-1 py-1 text-5xl font-bold">
            ₹{props.highest_bid}
          </div>
          <div className="ml-1  text-2xl font-semibold text-seller_light">
            Highest Bid
          </div>

          <div className="ml-1 py-2">
            <span className=" text-2xl font-semibold text-seller_light">
              Start Time:{" "}
            </span>
            <span className=" text-2xl font-semibold ">
               { timestampconvert(props.start_time)}{" "}
            </span>
          </div>

          <div className="ml-1 py-2">
            <span className=" text-2xl font-semibold text-seller_light">
              End Time:{" "}
            </span>
            <span className=" text-2xl font-semibold ">{timestampconvert(props.end_time)} </span>
          </div>

          <div className="ml-1 py-2">
            <span className=" text-2xl font-semibold text-seller_light">
              Number of bids registered:{" "}
            </span>
            <span className=" text-2xl font-semibold ">
              {props.bids_registered}
            </span>
          </div>

          <div className="ml-1 py-2">
            <div className="flex">
              <Button onClick={addbid} text={"Place Bid Now"} />
              <Button onClick={(e)=>{e.preventDefault();addwishlist(props.id)}} text={"Add to Wishlist"} />
            </div>
          </div>
          <div className=" py-2">
          <span className="text-seller_light">Seller </span>
                  <span className="text-2xl text-seller_dark px-1">{props.seller_name}</span>
                  <Rating rating={4.5} />
          </div>
          <div className="font-sofia ml-1 py-2 text-xl  ">
            {props.product_description}
          </div>
        </div>
      </div>
    </div>
    <Modal showModal={showModal} setShowModal={setShowModal} >
      <Bidform product_id={props.id} base_price={props.base_price} highest_bid={props.highest_bid}/>
    </Modal>
    </>
  );
}

export default ProductDetails;
