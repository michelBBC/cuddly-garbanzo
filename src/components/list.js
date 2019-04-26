import React, { useState } from 'react';
import shortid from 'shortid';

function List(props) {
    const [isClicked, setClick] = useState(false);
    const name = props.name;
    const header = props.displaySuggestions ? ['Available products for ',  <u><i>{name}</i></u>] :['Did you mean?'];

    function handleClick(e){
        console.log(e.target);
        isClicked ? setClick(false) : setClick(e.target.value);
    }

    if (!props.items) {
        return null;
    } else {
        return (
        <>
            <h3 className={props.className + '-header'}> {header} </h3>
            <ul className={props.className}>
            {props.items.map(item => (
                <li key={shortid.generate()} value={item[1]} onClick={handleClick}>{item[0]}</li>
            ))}
            </ul>
        </>
        );
        }
    }
export default List;