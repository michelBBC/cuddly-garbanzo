import React, {useState} from 'react';
import shortid from 'shortid';

function Correction(props, ref) {
    const [name, setName] = useState('name'); 

    function handleClick(e) {
        setName(e.target.key);
    }

    const suggestions = ['tata', 'baba', 'rara'];
    

    if (!props.suggestions || !props.displaySuggestions) {
        return null;
    } else {
        return (
        <>
            <div className="corrections" ><b>Did you mean?</b>
            {suggestions.map(item => (
                <div key={shortid.generate()} onClick={handleClick}>{item}</div>
            ))}
            </div>
        </>
        );
    }
  }
export default Correction;