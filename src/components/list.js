import React, { useState } from 'react';

function List(props) {
    const [isClicked, setClick] = useState(false);

    function handleClick(e){
        console.log(e.target);
        isClicked ? setClick(false) : setClick(e.target.value);
    }

    if (!props.items) {
        return null;
    } else {
        return (
        <>
            <h3 className={props.className + '-header'}> Did you mean? </h3>
            <ul className={props.className}>
            {props.items.map(item => (
                <li key={item[0]} value={item[1]} onClick={handleClick}>{item[0]}</li>
            ))}
            </ul>
        </>
        );
        }
    }
export default List;