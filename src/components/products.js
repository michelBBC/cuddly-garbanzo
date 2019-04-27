import React from 'react';

import List from './list';
import Gallery from './gallery';

function Products(props) {
    if (!props.items) {
        return null;
    } else {
        return (
        <>
            <Gallery className='gallery-products'
              items={props.items}
              name={props.name}
              displaySuggestions={props.displaySuggestions}
            />
            <List className='list-products'
              items={props.items} 
              name={props.name} 
              displaySuggestions={props.displaySuggestions} 
            />
        </>
        );
        }
    }
export default Products;