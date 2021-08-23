import React from 'react'
import Person from './Person'
import Notification from './Notification'
const Usericon = () => {
    return (
        <div className="flex justify-end p-4">
            <Notification/>
            <Person/>
        </div>
    )
}

export default Usericon
