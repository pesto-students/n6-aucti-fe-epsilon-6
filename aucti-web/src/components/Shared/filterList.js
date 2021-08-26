import React from 'react'

const FilterList = () => {
    return (
        <>
          <div className="w-full h-auto p-3 flex-col justify-center rounded">
            <div className="align-center font-sofia text-3xl p-2 border-b-2">Categories</div>

            <div className="align-center font-sofia text-xl ml-2">
            <ul className="font-sofia">
            <li> Antique </li>
            <li> Vintage </li>
            <li> Digital Art </li>
            <li> Historic </li>
            <li> Autographed </li>
            </ul> 
            </div>

            </div>
        </>
    )
}

export default FilterList
