import React from 'react'
import Cardlist from '../../Shared/cardlist'
import Filter from '../../Shared/filterCheckbox'
import Filter1 from '../../Shared/filterList'
import Filter2 from '../../Shared/filterRadio'
import Tag from '../../Shared/tag'

const SearchPage = () => {
    return (<>
           <div class="col-start-1 row-start-2 col-span-1 row-span-4 ">
                <Filter />
                <Filter1/>
                <Filter2/>
            </div>  
            <div class="col-start-2 row-start-1 col-span-4 row-span-1 flex justify-center">
             <div className="flex justify-start">
             <Tag name={"trending"}/><Tag name={"fresh arrival"}/><Tag name={"old"}/><Tag name={"popular"}/><Tag name={"new"}/>
             </div>
             </div>
        </>
    )
}

export default SearchPage
