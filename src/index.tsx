import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportwebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import {store} from "./redux/store"

const rootElement = document.getElementById("root")as Element;;

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
);

reportWebVitals((metrics: any) => {
  console.log(metrics);
});
