import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import App from "./App";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <App />
    </Router>
  </React.StrictMode>,
  rootElement
);