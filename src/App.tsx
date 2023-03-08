import './App.css';
import Allroutes from './components/Allroutes';
import React from 'react';
import axios from "axios"

axios.defaults.baseURL ="http://3.27.61.194:8082/"
function App(){
  return (
    <div className="App">
      <Allroutes />
    </div>
  );
}

export default App;
