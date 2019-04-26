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

  // const apiUrl = 'http://localhost:8080/';
  const apiUrl = 'https://intense-harbor-37098.herokuapp.com/';

  function handleClick() {
    fetch(apiUrl+'search?q=' + name + '&mixin=image')
      .then(response => response.json())
      .then(data => setProducts(data))
      .then(setTimeout(window.scrollTo(0, myRef.current.offsetTop), 1000));
    fetch(apiUrl+'correct?q=' + name)
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
      <Correction className="list-corrections" ref={myRef} displaySuggestions={isSwitchedOn} suggestions={suggestions}/>
      <List className="list-products" name={name} displaySuggestions={isSwitchedOn} items={products} />
      <Img item={isClicked}/>
      <p>
        Footer text
      </p>
    </div>
  );
}

export default App;
