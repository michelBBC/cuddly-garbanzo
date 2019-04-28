import React from 'react';
import shortid from 'shortid';
import './correction.css';
import checkmark from './checkmark.svg';

function Correction(props) {
    if (props.correctSpelling || props.suggestions === null) {
        return (
            <>
                <div className="corrections" ><b> {props.searchTerm} is spelled correctly</b><img src={checkmark} className="img-check" alt="check!" /></div>
            </>
            )

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