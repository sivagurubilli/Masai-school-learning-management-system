import './App.css';
import Allroutes from './components/Allroutes';
import React from 'react';
import axios from "axios"

axios.defaults.baseURL ="https://7b0c-202-142-81-217.in.ngrok.io"
function App(){
  return (
    <div className="App">
      <Allroutes />
    </div>
  );
}

export default App;
