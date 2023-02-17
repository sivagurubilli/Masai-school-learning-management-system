import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportwebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import {store} from "./Redux/store"

ReactDOM.render(
  
    <BrowserRouter>
    <ChakraProvider>
    <Provider store={store}>
      <App />
      
    </Provider>
    </ChakraProvider>
    </BrowserRouter>,
    

  document.getElementById("root")
);

reportWebVitals((metrics: any) => {
  console.log(metrics);
});
