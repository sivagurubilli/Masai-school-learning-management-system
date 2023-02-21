import './App.css';
import Allroutes from './components/Allroutes';
import React from 'react';
import axios from "axios"

axios.defaults.baseURL = "https://a354-202-142-114-239.in.ngrok.io"
function App(){
  return (
    <div className="App">
      <Allroutes />
    </div>
  );
}

export default App;

