import React, { useState, useRef } from 'react';
import logo from './logo.svg';
import search from './search.png';
import './App.css';

import Correction from './components/correction';
import Img from './components/img';
import List from './components/list';

import Switch from "react-switch";



function App() {
  const [name, setName] = useState(''); 
  const [products, setProducts] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [isClicked, setClick] = useState(false);
  const [isSwitchedOn, setSwitch] = useState(false);
  const myRef = useRef();

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleClick() {
    fetch('http://localhost:8080/search?q=' + name + '&mixin=image')
      .then(response => response.json())
      .then(data => setProducts(data))
      .then(setTimeout(window.scrollTo(0, myRef.current.offsetTop), 1000));
    fetch('http://localhost:8080/correct?q=' + name)
    .then(response => response.json())
    .then(data => setSuggestions(data));  
  }

  function handleSwitch() {
    setSwitch(!isSwitchedOn);
  }

  function resetQuery() {
    setName('');
    setProducts(null);
    setSuggestions(null);
  } 

  return (
    <div className="App">
      <header className="App-header">
        <h1>welcome to product search<img src={search} className="App-logo" alt="search-icon" /></h1>
        <h3>Type in any product name you're interested in</h3>
        <div className="form-container">
        <input className="form-input"
          value={name}
          onChange={handleNameChange}
        />
        <button className='form-button' onClick={handleClick}> Submit </button>
        <button className='form-button' onClick={resetQuery}> Reset </button>
        </div>
        <p> Include spelling suggestions?
        <Switch className="App-switch" checked={isSwitchedOn} onChange={handleSwitch} />
        </p>
      </header>
      <Correction ref={myRef} display={isSwitchedOn} suggestions={suggestions}/>
      <List className="list-products" items={products} />
      <Img item={isClicked}/>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
        </a>

    </div>
  );
}

export default App;
