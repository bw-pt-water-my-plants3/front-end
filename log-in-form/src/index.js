import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import App from "./App";
import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";
//import { axiosWithAuth } from "./utils/axiosWithAuth";
import PrivateRoute from "./utils/PrivateRoute"
//import Plants from "./components/Plants"
import AddPlant from "./components/Plants";
import EditPlant from "./components/EditPlant";
import MyPlants from "./components/MyPlants";




const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>

    <Router>
      
      <div className='Header'>

      <a href="https://affectionate-clarke-6222ba.netlify.app/">Home</a>

      <Link to="/">Log in</Link>
      <Link to="/register">Register</Link>
      <Link to="/protected">Plants</Link>

      </div>
      <App />

      <Switch>
        <PrivateRoute exact path="/protected" component={AddPlant}/>
        <PrivateRoute exact path="/protected" component={MyPlants}/>
        <PrivateRoute exact path="/protected" component={EditPlant}/>
        <Route exact path="/" render={() => <LogInForm />} />
        <Route path="/register" render={() => <RegisterForm />} />
      </Switch>
    </Router>
  </React.StrictMode>,
  rootElement
);

