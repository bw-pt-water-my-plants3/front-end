import React from "react";
import "./App.css";
import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";
import { Route, Switch } from "react-router-dom";

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
