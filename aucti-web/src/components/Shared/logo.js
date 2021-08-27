import React from 'react'
import {useHistory} from 'react-router-dom'
const Logo = () => {
    const history = useHistory()
    return (
        <div className="m-2 flex justify-center" onClick={()=>{ history.push("/") } }  >
            <img src="./auctilogo.PNG" alt="" className="w=full h-16" />
        </div>
    )
}

export default Logo
