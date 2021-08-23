import React from 'react'
import Button from './button'
import Favourite from './favourite'
import Rating from './rating'
import { Halfstar, Star } from './star'

function Card(props) {
    return (
        <div className="font-sofia max-w-sm max-h-sm rounded-md border overflow-hidden hover:shadow-lg pd-2 pt-2 mx-2">
            <img src="https://source.unsplash.com/random"
            alt="img"
            className="object-scale-down px-2 h-60 w-full"
            />
            <div className="px-3 py-2">
                <div className="font-bold text-black-500 text-xl mb-2">
                Vintage Typewriter 1920s Remington Paragon
                </div>
            </div>
            <ul className="mx-2 py-1 px-1">
               <li className="text-3xl" ><strong>4000</strong></li> 
               <li className="text-lg text-seller_light">Highest Bid</li> 
               <li ><Rating sellername={"Symphony of the Seas"} rating={2.5}/></li> 
            </ul>

            <div className="px-4 py-2 grid grid-cols-2">
                <div onClick={props.fun} className="grid-col-start-1"><Button text={"Bid Now"}/> </div>
                <div onClick={props.fun} className="grid-col-start-2 mb-1  flex justify-end"><Favourite/></div>
            </div>
        </div>
    )
}

export default Card
