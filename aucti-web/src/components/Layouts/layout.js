import React from 'react'
import { Children } from 'react'
import Header from './header'
import Sidebar from './sidebar'
//make side bar a part of the content

const Layout = ({children}) => {
    return (
        <div class="grid grid-cols-5 grid-rows-5 grid-flow-row grid-flow-col gap-1">
            <Header/>
            <Sidebar/>

            <div class="row-start-2 col-start-2 row-span-4 col-span-4 bg-green-500 ...">{children}</div>
        </div>
    )
}

export default Layout
