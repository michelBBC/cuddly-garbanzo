import React from 'react';
import shortid from 'shortid';
import './correction.css';

function Correction(props) {
    if (!props.suggestions || !props.displaySuggestions) {
        return null;
    } else {
        return (
        <>
            <div className="corrections" ><b>Did you mean?</b>
            {props.suggestions.map(item => (
                <button key={shortid.generate()} className="text-button" value={item} onClick={props.handleSuggestionClick}><u><i>{item}</i></u></button>
            ))}
            </div>
        </>
        );
    }
  }
export default Correction;