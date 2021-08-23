import React from 'react'
import Cardlist from '../../Shared/cardlist'
import Filter from '../../Shared/filterCheckbox'
import Filter1 from '../../Shared/filterList'
import Productpage from '../ProductPage/ProductPage'
function LandingPage() {
    return (<>       
      <div class="col-start-1 row-start-1 col-span-1 row-span-1 ">
        <Filter1/>
      </div>
      <div class="col-start-2 row-start-1 col-span-4 row-span-1 ">
      <div id="main" class="grid grid-cols-3 gap-1 justify-evenly"> 
         <Cardlist/>
      </div>   
      </div>
        </>
    )
}

export default LandingPage
