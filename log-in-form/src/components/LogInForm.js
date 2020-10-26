import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth"; // Added utils file to submit  form 
import { postLogin, getUsers, fetchAllPlants } from '../actions/actions'





export default function LoginForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });

  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  // post request
  const [post, setPost] = useState([]);
  const [serverError, setServerError] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });

  const eye = <FontAwesomeIcon icon={faEye} />;

  const [password, setPassword] = useState(false);

  const togglePassword = () =>{
    setPassword(password ? false : true)
  }




  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const inputChange = (e) => {
    e.persist();
    console.log("something changed");
    const loginFormState = {
      ...formState,
      [e.target.name]: e.target.value
    };
    console.log(loginFormState);
    setFormState(loginFormState);
    validateChange(e);
  };



  const submitForm = (e) => {
    e.preventDefault()
      axiosWithAuth()
        .post("https://reqres.in/api/auth/login", formState)
        .then((res) => {
          console.log("JG: Login.js: login: res: ", res);
          localStorage.setItem("token", res.data.payload);
          this.props.history.push("/protected");
          setPost(res.data);

        setServerError(null)

        setFormState({
          username: "",
          password: "",
        });
      })
      .catch((err) => {
        setServerError("oops! something happened!");
      });
  };
  




  console.log(formState);

  // add yup library

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Enter your password")
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log("Is my form valid?", valid);
      setButtonIsDisabled(!valid);
    });
  }, [formState]);

  return (
    <div>
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>
            <h1>Log In</h1></legend>
          <label htmlFor="username" className="labels">Username: </label>
          <input
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            value={formState.username}
            onChange={inputChange}
          />
          {errors.username.length > 0 ? (
            <p className="error">{errors.username}</p>
          ) : null}


          <label htmlFor="password" className="labels"> Password: </label>
          <input
            placeholder="Password"
            type={password ? "text" : "password"}
            id="password"
            name="password"
            value={formState.password}
            onChange={inputChange}
          />
          <i onClick={togglePassword}>{eye}</i>
          {errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
          ) : null}
          <button type="submit" disabled={buttonIsDisabled}>
            Sign In
          </button>
            <h2>
          <Link to="/register">New User? </Link>
          </h2>
        </fieldset>
      </form>
    </div>
  );
}