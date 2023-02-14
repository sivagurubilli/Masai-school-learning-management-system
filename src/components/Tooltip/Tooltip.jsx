import React, { useState, useEffect } from 'react';
import './Tooltip.css'

const Tooltip = ({value,show,setShow}) => {
  
// after 5 secs tooltip disapppear 
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }, []);
  
  return (
    <div id="tooltip" className={`component ${show ? 'show' : 'hide'}`}>
    <img  className="svg" src="https://cdn-icons-png.flaticon.com/512/6897/6897039.png"/>
    <p>{value}</p> 
    </div>
  );
};

export default Tooltip;
