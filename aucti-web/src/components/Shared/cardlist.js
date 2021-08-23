import React from 'react'
import Card from './card';

const Cardlist = () => {
    return (
        <>
          {
              (function(){
                let rows = [];
                for (let index = 0; index < 10; index++) {
                  rows.push(<Card/>);
                }
                return rows;
              })()}
        </>
    )
}

export default Cardlist
