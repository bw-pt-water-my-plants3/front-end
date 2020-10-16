import React from "react";
import "./styles.css";
import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";
import { Route, Switch, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" render={() => <LogInForm />} />
        <Route path="/register" render={() => <RegisterForm />} />
      </Switch>
    </div>
  );
}
