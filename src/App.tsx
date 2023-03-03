import './App.css';
import Allroutes from './components/Allroutes';
import React from 'react';
import axios from "axios"

axios.defaults.baseURL ="http://54.253.97.185/"
function App(){
  return (
    <div className="App">
      <Allroutes />
    </div>
  );
}

export default App;
