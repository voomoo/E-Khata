//react imports
import React from "react";
import ReactDOM from "react-dom";

//3rd party packages import
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

//local imports
import rootReducer from "./_redux/rootReducer";
import RootComponent from "./components/RootComponent";

//import local css
import "./assets/css/styles.css";

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootComponent />
    </Router>
    <ToastContainer autoClose={5000} />
  </Provider>,
  document.getElementById("root")
);
