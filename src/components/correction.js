import React, {useState, useRef, useImperativeHandle, forwardRef} from 'react';

function Correction(props, ref) {
    const [name, setName] = useState('name'); 
    const myRef = useRef();

    // To bubble up the ref to the parent component
    useImperativeHandle(ref, () => ({
        focus: () => {
          myRef.current.focus();
        }
      }));

    function handleClick(e) {
        setName(e.target.key);
    }
    console.log(myRef);

    if (!props.suggestions || !props.display) {
        return <div ref={myRef} />;
    } else {
        return (
        <>
            <h3 ref={myRef}>Did you mean?</h3>
            <ul>
            {props.suggestions.map(item => (
                <li key={item} onClick={handleClick}>{item}</li>
            ))}
            </ul>
        </>
        );
    }
  }
Correction = forwardRef(Correction)
export default Correction;