import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import * as yup from "yup";

export default function LogInForm() {
  const [formState, setFormState] = useState({
    name: "",
    password: ""
  });

  // post request
  // onChange
  // add yup library

  return (
    <div>
      <form>
        <fieldset>
          <legend>Log In</legend>
          <label htmlfor="username">Username: </label>
          <input type="text" id="username" />
          <br />
          <label htmlfor="password"> Password: </label>
          <input type="password" id="password" />
          <br />
          <br />
          
            <button>Log In</button>
          
          <Link to="/register">New User </Link>
          <Route path="/register" component={RegisterForm} />
        </fieldset>
      </form>
    </div>
  );
}
