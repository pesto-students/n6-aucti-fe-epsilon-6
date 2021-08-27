import React from 'react'

const PageNotFound = (props) => {
    return (
        
        <div className="bg-purple-100 text-gray-600 flex justify-center h-screen col-start-1 row-start-1 col-span-5 ">
        <div className="font-sofia flex flex-col justify-center">
            <div className="text-3xl font-semibold">Page not found !!</div>
            <div className="text-2xl ">Error : {props.message}</div>
        </div>
        </div>
    )
}

export default PageNotFound