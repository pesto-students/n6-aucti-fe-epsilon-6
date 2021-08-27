import React from 'react'
import Cardlist from '../../Shared/cardlist'
import FilterCheckBox from '../../Shared/filterCheckbox'
import FilterList from '../../Shared/filterList'
import FilterRadio from '../../Shared/filterRadio'
import Tag from '../../Shared/tag'

const SearchPage = () => {
    return (<>
           <div class="col-start-1 row-start-1 col-span-1 row-span-4 ">
                <FilterCheckBox />
                <FilterList/>
                <FilterRadio/>
            </div>  
            <div class="col-start-2 row-start-1 col-span-4 row-span-1">
             <div className="flex justify-start">
             <Tag name={"trending"}/><Tag name={"fresh arrival"}/><Tag name={"old"}/><Tag name={"popular"}/><Tag name={"new"}/>
             </div>
             <div className="flex justify-start p-2">
                 < div className="grid grid-cols-3 gap-2 justify evenly">
                  <Cardlist/>
                  </div>
            </div>
             </div>
        </>
    )
}

export default SearchPage
