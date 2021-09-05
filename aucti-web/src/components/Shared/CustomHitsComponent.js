import React from 'react'
import {Link} from 'react-router-dom'
import { connectStateResults } from "react-instantsearch-dom";
const CustomHitsComponent = ({ props, searchState, searchResults }) => {
   

    const validQuery = searchState.query?.length >= 3;
    return (
        <>
        {searchResults?.hits.length === 0 && validQuery && (
          <p>Aw snap! No search results were found.</p>
        )}
         {searchResults?.hits.length > 0 && validQuery && props.show  &&(
        <ol className="absolute w-1/2 top-20 border m-l-2 p-2 bg-white shadow">
          {searchResults.hits.map((hit,index) => (
                   <Link key={index} to={`/product/${hit.objectID}`}>
                   <li  className="font-sofia font-semibold p-1 border-b overflow-ellipsis" key={hit.objectID}>
                       {hit.title}
                    </li>
                   </Link>
          ))}
        </ol>
      )}
    </>
    )
}

export default connectStateResults(CustomHitsComponent)
