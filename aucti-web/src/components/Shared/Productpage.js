import React from "react";
import Button from "./button";
import Rating from "./rating";
import { Facebook, Instagram, Twitter, Whatsapp } from "./socialmedia";
import { Star, Halfstar } from "./star";

function Productpage(props) {
  return (
    <div className="m-3 w-4/5 h-7/10  rounded-2xl border hover:shadow-lg font-sofia">
      <div className="flex justify-center">
        <div className="m-auto mt-6  w-2/6">
          <img
            src="https://source.unsplash.com/random"
            alt="img"
            className="w-full h-1/2 px-2 py-2"
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
              {props.start_time}{" "}
            </span>
          </div>

          <div className="ml-1 py-2">
            <span className=" text-2xl font-semibold text-seller_light">
              End Time:{" "}
            </span>
            <span className=" text-2xl font-semibold ">{props.end_time} </span>
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
              <Button onClick={props.onClick} text={"Place Bid Now"} />
              <Button onClick={props.onClick} text={"Add to Wishlist"} />
            </div>
          </div>

          <Rating sellername={"Symphony of the Seas"} rating={4.5} />

          <div className="font-sofia ml-1 py-2 text-xl  ">
            {props.product_description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productpage;
