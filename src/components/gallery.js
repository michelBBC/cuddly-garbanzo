import React from 'react';
import shortid from 'shortid';
import './gallery.css';

// const imgUrls = ['https://source.unsplash.com/PC_lbSSxCZE/800x600','https://source.unsplash.com/lVmR1YaBGG4/800x600','https://source.unsplash.com/5KvPQc1Uklk/800x600','https://source.unsplash.com/GtYFwFrFbMA/800x600','https://source.unsplash.com/Igct8iZucFI/800x600','https://source.unsplash.com/M01DfkOqz7I/800x600','https://source.unsplash.com/MoI_cHNcSK8/800x600','https://source.unsplash.com/M0WbGFRTXqU/800x600','https://source.unsplash.com/s48nn4NtlZ4/800x600','https://source.unsplash.com/E4944K_4SvI/800x600','https://source.unsplash.com/F5Dxy9i8bxc/800x600','https://source.unsplash.com/iPum7Ket2jo/800x600'
// ];
function Gallery(props){
    const imgUrls = props.items;
    const header = props.displaySuggestions ? ['Images for ',  <u><i>{props.name}</i></u>, ':'] :['Images:'];

    function renderImageContent(src, index) {
        let [name,url] = src;
        return (
            <img src={url} key={shortid.generate()} alt={name} title={name} />
        ) 
    }

    return (
      <div className='gallery-container'>
        <h4 className='gallery-header'> {header} </h4>
        <div className="gallery-grid">
          {imgUrls.map(renderImageContent)}
        </div>
      </div>
    )
}

export default Gallery;