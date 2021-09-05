import React from 'react'
import {Link} from 'react-router-dom'
import FilterCheckBox from '../../Shared/filterCheckbox'
import FilterList from '../../Shared/filterList'
import FilterRadio from '../../Shared/filterRadio'
import Tag from '../../Shared/tag'

import { Hits, Pagination} from 'react-instantsearch-dom';


const Hit = ({ hit }) => (
     <Link to={`/product/${hit.objectID}`}>
         <div className="w-full h-auto m-2 p-1 flex flex-start">
             <div className=" border rounded-xl p-5 font-sofia ">
                 <div className="flex flex-cols justify-around border-b-2">
                        <div className="text-2xl p-1">
                                <h2>{hit.title}</h2>
                        </div>
                        <div className="text-xl p-1">
                                <h3>{hit.base_price}</h3>
                        </div>
                </div>
                <div className="font-semibold p-1">
                        <h3>{hit.description}</h3>
                </div>
    
             </div>
         </div>
     </Link> 
       
);
const SearchPage = () => {
    return (<>
           <div className=" col-start-1 row-start-1 col-span-1 row-span-4 " id="filtercontainer">                 
                <FilterList/>
                <FilterRadio/>
            </div>  
            <div className="col-start-2 row-start-1 col-span-4 row-span-1">
             <div className="flex justify-start">
             <Tag name={"trending"}/><Tag name={"fresh arrival"}/><Tag name={"old"}/><Tag name={"popular"}/><Tag name={"new"}/>
             </div>
             </div>
             <div className="col-start-2 row-start-2 col-span-4 row-span-4">
                 < div className="">
                  <Hits hitComponent={Hit} />
                  </div>
                  <span className="flex justify-center"><Pagination showLast/></span>
            </div>
            
        </>
    )
}


export default SearchPage
