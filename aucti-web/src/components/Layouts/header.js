import React from 'react'
import Logo from '../Shared/logo'
import Searchbar from '../Shared/searchbar'
import Usericon from '../Shared/usericon'

const Header = () => {
    return (
           <>
            <div className="col-start-1 row-start-1 col-span-1 row-span-1  "><Logo/></div>
            <div className="row-start-1 col-start-2 col-span-3 row-span-1  "><Searchbar/></div>
            <div className="row-start-1 col-start-5 col-span-1 row-span-1  "><Usericon/></div>
           </>
    )
}

export default Header;
