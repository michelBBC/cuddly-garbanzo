import React, { useState } from 'react';
import logo from './search.png';
import './App.css';

import Correction from './components/correction';
import Products from './components/products';

import Switch from 'react-switch';
import {scroller} from 'react-scroll';


function App() {
  const defaultInput = 'Search for a product';
  const [term, setTerm] = useState(defaultInput);
  const [submittedTerm, setSubmittedTerm] = useState(false);
  const [correctSpelling, setCorrectSpelling] = useState(true); 
  const [products, setProducts] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [isSwitchedOn, setSwitch] = useState(false);
  const apiUrl = 'https://intense-harbor-37098.herokuapp.com/';

  // Input field events
  function handleInputChange(e) {
    const newTerm = e.currentTarget.value;
    setTerm(newTerm);
  }

  function clickField(e){
    if (e.currentTarget.value === defaultInput) {
      setTerm('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }


  // Submit button events
  function handleSubmit() {
    if (term !== defaultInput){
      fetch(apiUrl+'suggestions?q=' + term + '&mixin=image&products=true')
        .then(response => response.json())
        .then(
          data => {
            setProducts(data['results']);
            setSuggestions(data['spelling_suggestions']);
            setCorrectSpelling(data['spelling_correct']);
            setSubmittedTerm(term);
            scrollTo();
          }
        );
    }
  }

  function scrollTo() {
    scroller.scrollTo('app-main', {
      duration: 1000,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }


  // Reset button events
  function resetQuery() {
    setTerm(defaultInput);
    setProducts(null);
    setSuggestions(null);
  } 


  // Switch button events
  function handleSwitch() {
    setSwitch(!isSwitchedOn);
  }


  // Spelling suggestions events
  function handleSuggestionClick(e){
    handleInputChange(e);
    const newTerm = e.currentTarget.value;
    setSubmittedTerm(newTerm);
    setCorrectSpelling(true);
    fetch(apiUrl+'suggestions?q=' + newTerm + '&mixin=image&products=true')
    .then(response => response.json())
    .then(
      data => {
        setProducts(data['results']);
        setSuggestions(data['spelling_suggestions']);
        scrollTo();
      });
  }

  //Render App
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>welcome to product search<img src={logo} className='App-logo' alt='search-icon' /></h1>
        <div className='form-container'>
        <input className='form-input'
          value={term}
          onClick={clickField}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} 
        />
        <button className='form-button' onClick={handleSubmit}> Submit </button>
        <button className='form-button' onClick={resetQuery}> Reset </button>
        </div>
        <div className='container-switch'> Include products found?
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
          suggestions={suggestions}
          correctSpelling={correctSpelling}
          searchTerm={submittedTerm}
          handleSuggestionClick={handleSuggestionClick}
        />
        <Products term={submittedTerm} 
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
