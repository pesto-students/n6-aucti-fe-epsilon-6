import React from 'react'

const FilterRadio = () => {
    return (
        <>
         <div className="w-full h-auto p-3 flex-col justify-center rounded ">
            <div className="align-center font-sofia text-3xl p-2 border-b-2">Pricing</div>

            <div className="align-center font-sofia text-xl ml-2">
            <ul className="font-sofia">
            <li> 
            <input type="radio" id="age1" name="age" value="30"/>
            <label htmlFor="age1"> more than 50,000</label>
            </li>
            <li> 
            <input type="radio" id="age1" name="age" value="30"/>
            <label htmlFor="age1"> 50k to 30K</label>
            </li>
            <li> 
            <input type="radio" id="age1" name="age" value="30"/>
            <label htmlFor="age1"> 30k to 10K </label>
            </li>
            <li> 
            <input type="radio" id="age1" name="age" value="30"/>
            <label htmlFor="age1"> below 10K</label>
            </li>
            </ul> 
            </div>

            </div>
        </>
    )
}

export default FilterRadio
