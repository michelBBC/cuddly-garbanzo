import React from 'react';
import shortid from 'shortid';
import './list.css';

function List(props) {
    // const [isClicked, setClick] = useState(false);
    const name = props.name;
    const header = props.displaySuggestions ? ['Available products for ',  <u key={shortid.generate()}><i>{name}</i></u>] :['Did you mean?'];

    function handleClick(e){
        console.log(e.currentTarget.value);
        // props.isClicked ? setClick(false) : setClick(e.target.value);
    }

    if (!props.items) {
        return null;
    } else {
        return (
        <div className={props.className}>
            <h4 className={props.className + '-header'}> {header} </h4>
            <ul className={props.className}>
            {props.items.map(item => (
                <li key={shortid.generate()} value={item.name} onClick={handleClick}>{item.name}</li>
            ))}
            </ul>
        </div>
        );
        }
    }
export default List;