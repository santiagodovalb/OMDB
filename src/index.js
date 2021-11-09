import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./state/store";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
