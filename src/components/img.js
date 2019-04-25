import React, {useState} from 'react';

function Img(props) {
    console.log(props);

    if (!props.item) {
        return null;
    } else {
        return (
        <>
            <div className='popup'>
                <img src={props.item} alt="Cannot display product."/>
            </div>
        </>
        );
    }
  }

export default Img;