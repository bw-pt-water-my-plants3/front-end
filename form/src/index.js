import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import App from "./App";
import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Link to="/login">Log in</Link>
      <Link to="/register">Register</Link>
      <App />

      <Switch>
        <Route path="/login" render={() => <LogInForm />} />
        <Route path="/register" render={() => <RegisterForm />} />
      </Switch>
    </Router>
  </React.StrictMode>,
  rootElement
);
