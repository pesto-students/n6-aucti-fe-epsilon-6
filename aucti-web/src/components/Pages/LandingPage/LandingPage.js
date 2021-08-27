import React from 'react'
import Cardlist from '../../Shared/cardlist'
import Quicklink from '../../Shared/Quicklink'
import FilterList from '../../Shared/filterList'
import Productpage from '../ProductPage/ProductPage'
function LandingPage() {
    return (<>       
      <div class="col-start-1 row-start-1 col-span-1 row-span-1 ">
        <FilterList/>
      </div>
      <div class="col-start-2 row-start-1 col-span-4 row-span-1 ">
      <div id="main" class="grid grid-cols-3 gap-1 justify-evenly"> 
         <div className="flex flex-col  justify-start">
         <Quicklink image_url="https://images.pexels.com/photos/1302883/pexels-photo-1302883.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
         <Quicklink image_url="https://images.unsplash.com/photo-1616144848810-11eec385ddbd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"  />
         <Quicklink image_url="https://images.unsplash.com/photo-1617014673615-8e0e73b06d56?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80" />
         </div>
       
         <Cardlist/>
      </div>   
      </div>
        </>
    )
}

export default LandingPage
