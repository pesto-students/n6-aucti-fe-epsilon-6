import React,{useState} from 'react'
import axios  from 'axios'
const Bidform = (props) => {
    // const [bidprice, setbidprice] = useState(0)
    // const userid = localStorage.getItem("user_id")
    // const handleSubmit = (e) =>{

    //     const obj = {
    //         user_id : userid,
    //         product_id :props.product_id,
    //         bid_price :bidprice
    //     }

    //      axios.post('/bids',obj)
    //      .then(()=>{console.log('bid Submitted')})
    //      .catch(()=>{console.log('bid not submitted')})
    // }

    // const handlebid=(e)=>{
    //      setbidprice(e.target.value)
    // }

    return (
        // <div className="w-full h-auto ">
        //     <form className="w-full justify-center" onSubmit={props.handleSubmit}>
        //     <div className="p-3">
        //       <label className="text-2xl mr-6" htmlFor="base_price">Base Price  </label>
        //       <input className="text-2xl px-4 bg-gray-200" disabled id="base_price"  type="text" value={props.base_price}/>
        //     </div>
        //     <div className="p-3">
        //       <label className="text-2xl mr-6" htmlFor="highest_bid">Highest Bid  </label>
        //       <input className="text-2xl px-4 bg-gray-200" disabled id="highest_bid" type="text" value={props.highest_bid}/>
        //     </div>
        //     <div className="p-3">
        //       <label className="text-2xl mr-6" htmlFor="bid">Place Bid  </label>
        //       <input className="text-2xl px-4 bg-gray-100"  id="bid" type="text" name="bid_price" value={bidprice} onChange={handlebid}/>
        //     </div>
        //     <div className="p-3 flex flex-cols justify-center">
        //        <input className="font-semibold border rounded-l p-2" type="submit"/>  
        //     </div>
        //     </form>            
        // </div>
        <h1>bidform</h1>
    )
}

export default Bidform
