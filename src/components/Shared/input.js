import React from 'react'

const Input = (props) => {
    return (
        <>
       <label className="block font-sofia text-2xl ml-2  m-1/2">{props.title}</label>
       <input className="border font-Sofia text-xl ml-2 w-1/3 p-2" 
        name={props.name}  onChange={props.onChange} placeholder={props.placeholder}/>
    </>
    )
}

export default Input
