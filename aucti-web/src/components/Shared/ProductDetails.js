import React,{useState,useEffect} from "react";
import axios from "axios";
import {connect} from 'react-redux'
import Button from "./button";
import Rating from "./rating";
import { Facebook, Instagram, Twitter, Whatsapp } from "./socialmedia";
import Modal from "./Modal";

import {addWishlistAction} from '../../redux/actions/wishlistActions'

function ProductDetails(props) {

  var initialState = false
  const [showModal, setShowModal] = useState(initialState)

  const userid = localStorage.getItem("user_id")
  const  addbid =()=>{setShowModal(true)}
  
  const addwishlist = (id) =>{
    props.addToWishlist(localStorage.getItem('user_id'),props.id)
    console.log( 'wishlist added',props.wishlistadded)
  }

  //-----bids

   const [bidprice, setbidprice] = useState(0)
    const handleSubmit = (e) =>{

        const obj = {
            user_id : userid,
            product_id :props.product_id,
            bid_price :bidprice
        }

         axios.post('/bids',obj)
         .then(()=>{console.log('bid Submitted')})
         .catch(()=>{console.log('bid not submitted')})

    }

    const handlebid=(e)=>{
         setbidprice(e.target.value)
    }

    console.log(props.wishlistadded)

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
           <h1>{props.wishlistadded}</h1>
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
      {/* <Bidform product_id={props.id} base_price={props.base_price} highest_bid={props.highest_bid}/> */}
      <div className="w-full h-auto ">
            <form className="w-full flex flex-col justify-center" onSubmit={handleSubmit}>
            <div className="p-1 flex flex-cols justify-center border-b-2">
              <span className="text-2xl p-1" >Base Price:</span>
              <span className="text-2xl p-1">{props.base_price}</span>
            </div>
            <div className="p-1 flex flex-cols justify-center border-b-2">
              <span className="text-2xl p-1">Highest Bid:</span>  
              <span className="text-2xl p-1">{props.highest_bid}</span>
            </div>
            <div className="p-1 flex flex-cols justify-center">
              <span className="text-2xl p-1">Place Bid:</span>
              <input className="text-xl w-24 px-1 border"  id="bid" type="text" name="bid_price" value={bidprice} onChange={handlebid}/>
            </div>
            <div className="p-1 flex flex-cols justify-center">
               <input className="font-semibold border rounded-l p-2" type="submit"/>  
            </div>
            </form>            
        </div>
    </Modal>
    </>
  );
}

const mapStateToProps = (state) =>{
  return {
    wishlistadded : state.wishlistReducer,
    // bidplaced : state.bidReducer,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    addToWishlist :(user_id,product_id)=> dispatch(addWishlistAction(user_id,product_id)),
    // placeBid : (user_id,product_id,bid_price)=>dispatch(placeBidAction(user_id,product_id,bid_price)),
  }
}

export default connect(mapStateToProps ,mapDispatchToProps ) (ProductDetails);
