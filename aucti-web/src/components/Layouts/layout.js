import React from 'react'
import { Children } from 'react'
import Header from './header'
//make side bar a part of the content

const Layout = ({children}) => {
    return (<>
        <div class="grid grid-cols-5 grid-rows-1 grid-flow-row grid-flow-col gap-1">
            <Header/>
        </div>
        <div class="grid grid-cols-5 grid-rows-1 grid-flow-row grid-flow-col gap-1">
        {/* <div class="row-start-1 col-start-1 row-span-1 col-span-5 "> */}
            {children}
        {/* </div> */}
        </div>
       </>
    )
}

export default Layout
