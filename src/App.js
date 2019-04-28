import React, { useState } from 'react';
import logo from './search.png';
import './App.css';

import Correction from './components/correction';
import Products from './components/products';

import Switch from 'react-switch';
import {scroller} from 'react-scroll';


function App() {
  const defaultInput = 'Search for a product';
  const [name, setName] = useState(defaultInput); 
  const [products, setProducts] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [isSwitchedOn, setSwitch] = useState(false);
  const apiUrl = 'https://intense-harbor-37098.herokuapp.com/';

  // Input field events
  function handleNameChange(e) {
    const newName = e.currentTarget.value;
    setName(newName);
  }

  function clickField(e){
    if (e.currentTarget.value === defaultInput) {
      setName('');
    }
  }

  function _handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }


  // Submit button events
  function handleSubmit() {
    if (name !== defaultInput){
      fetch(apiUrl+'search?q=' + name + '&mixin=image&suggestions=true')
        .then(response => response.json())
        .then(
          data => {
            setProducts(data['results']);
            setSuggestions(data['spelling_suggestions']);
            scrollTo();
          }
        );
    }
  }

  function scrollTo() {
    scroller.scrollTo('app-main', {
      duration: 1500,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }


  // Reset button events
  function resetQuery() {
    setName(defaultInput);
    setProducts(null);
    setSuggestions(null);
  } 


  // Switch button events
  function handleSwitch() {
    setSwitch(!isSwitchedOn);
  }


  // Spelling suggestions event
  function handleSuggestionClick(e){
    handleNameChange(e);
    handleSubmit();
  }


  //Render App
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>welcome to product search<img src={logo} className='App-logo' alt='search-icon' /></h1>
        <div className='form-container'>
        <input className='form-input'
          value={name}
          onClick={clickField}
          onChange={handleNameChange}
          onKeyDown={_handleKeyDown} 
        />
        <button className='form-button' onClick={handleSubmit}> Submit </button>
        <button className='form-button' onClick={resetQuery}> Reset </button>
        </div>
        <div className='container-switch'> Include spelling suggestions?
        <Switch className='App-switch' 
            checked={isSwitchedOn} 
            onChange={handleSwitch} 
            onColor='#00AA00'
            onHandleColor='#FFF'
            handleDiameter={30}
            boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
            activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
            height={20}
            width={48}
            id='material-switch'
        />
        </div>
      </header>
      <div name='app-main' className='App-main'>
        <Correction className='list-corrections' 
          displaySuggestions={isSwitchedOn} 
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
        <Products name={name} 
          displaySuggestions={isSwitchedOn} 
          items={products}
        />
      </div>
      <footer>
      Test Demonstrator for <i>spellcheck feature</i>. <a href='https://github.com/michelBBC/cuddly-garbanzo' target='_blank' rel='noopener noreferrer'> Source</a>
      </footer>
    </div>
  );
}

export default App;
