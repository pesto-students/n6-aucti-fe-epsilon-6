import React from 'react'
import Button from './button'
import { Facebook, Instagram, Twitter, Whatsapp } from './socialmedia'
import {Star,Halfstar} from './star'

function Productpage(props) {
    return (
        <div className="m-3 w-4/5 h-7/10  rounded-2xl border hover:shadow-lg">
            <div className="flex justify-center">
                <div className="m-auto mt-6  w-2/6">
                    <img src="https://source.unsplash.com/random"
                    alt="img"
                    className="w-full h-1/2 px-2 py-2"
                    />
                    <span className="w-24 h-5 flex justify-between  mx-auto">
                        <Facebook/>
                        <Instagram/>
                        <Twitter/>
                        <Whatsapp/>
                    </span>
                    </div> 

                <div className="m-2 flex flex-col w-4/6  font-sofia">
                    <div className="ml-1 mr-2 py-3 text-3xl font-bold">
                    ParagonRomario's Flamengo Worn and Signed Shirt, 1995
                    </div>

                    <div className="ml-1 py-1 text-5xl font-bold">
                    ₹15000                 
                    </div>
                    <div className="ml-1  text-2xl font-semibold text-purple-700">
                     Base Price 
                    </div>

                    <div className="ml-1 py-1 text-5xl font-bold">
                    ₹35000                 
                    </div>
                    <div className="ml-1  text-2xl font-semibold text-purple-700">
                     Highest Bid 
                    </div>

                    <div className="ml-1 py-2">
                      <span className=" text-2xl font-semibold text-purple-700">Start Time:  </span>
                      <span className=" text-2xl font-semibold ">19/08/2021 07:00 pm </span>
                    </div>

                    <div className="ml-1 py-2">
                      <span className=" text-2xl font-semibold text-purple-700">End Time: </span>
                      <span className=" text-2xl font-semibold ">29/08/2021 10:15 am </span>
                    </div>

                    <div className="ml-1 py-2">
                      <span className=" text-2xl font-semibold text-purple-700">Number of bids registered: </span>
                      <span className=" text-2xl font-semibold ">21</span>
                    </div>

                    <div className="ml-1 py-2">
                        <div className="flex">
                         <Button onClick={props.onClick}  text={"Place Bid Now"} />
                         <Button onClick={props.onClick}   text={"Add to Wishlist"}/>
                        </div>
                    </div>

                    <div className="ml-1 py-2">

                       <span className="text-purple-600 mr-2 ">Seller</span> 
                       <span className=" text-2xl  text-purple-700"> Symphony of the Oceans</span>
                       <span className="text-purple-600 font-semibold mx-4 ">Rating</span> 
                       <span className="inline-flex text-yellow-300 mx-1">
                        <Star/>
                        <Star/>
                        <Star/>
                        <Star/>
                        <Halfstar/>
                        </span>
                        <span className="text-purple-600 font-semibold mx-4 ">4.5</span> 
                    </div>

                    <div className="ml-1 py-2 text-xl  ">
                       The shorts are such a great color and in really good condition. They were stiff upon arrival but softened up after the initial wash. Wish I had taken better measurements as they are much bigger in all areas except for the waist :( but that's on me. Shipping was speedy and item was packaged well.
                    </div>

                    
                </div> 
            </div>
        </div>
    )
}

export default Productpage
