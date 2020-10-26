import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import axios from "axios";
import { axiosWithAuth1 } from "../utils/axiosWithAuth";



export default function RegisterForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [post, setPost] = useState([]);
  const [serverError, setServerError] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
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
        setErrors({ ...errors, [e.target.name]: "" });
        console.log("success");
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
        console.log("error:", err);
      });
  };

  const inputChange = (e) => {
    e.persist();
    console.log("something changed");
    const signupForm = {
      ...formState,
      [e.target.name]: e.target.value
    };
    setFormState(signupForm);
    validateChange(e);
  }


  const submitForm = (e) => {
    e.preventDefault()
      axiosWithAuth1()
        .post("https://reqres.in/api/auth/register", formState)
        .then((res) => {
          console.log("JG: Login.js: login: res: ", res);
          localStorage.setItem("token", res.data.payload);
          this.props.history.push("/protected");
          setPost(res.data);

        setServerError(null)

        setFormState({
          name: "",
          email: "",
          phone: "",
          username: "",
          password: "",
        });
      })
      .catch((err) => {
        setServerError("oops! something happened!");
      });
  };
  



  console.log(submitForm)


  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email(),
    phone: yup.string().required(),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Enter a valid password"),
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
          <legend><h1>Register</h1></legend>
          <label htmlFor="name" className="labels">Name: </label>
          <input
          placeholder="Name"
            type="text"
            id="name"
            name="name"
            onChange={inputChange}
            value={formState.name}
          />
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}

          <label htmlFor="email" className="labels">Email: </label>
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            onChange={inputChange}
            value={formState.email}
          />
          {errors.email.length > 0 ? (
            <p className="error">{errors.email}</p>
          ) : null}

          <label htmlFor="phone" className="labels">Phone Number: </label>
          <input
            placeholder="Phone Number"
            type="tel"
            id="phone"
            name="phone"
            onChange={inputChange}
            value={formState.phone}
          />
          {errors.phone.length > 0 ? (
            <p className="error">{errors.phone}</p>
          ) : null}

          <label htmlFor="username" className="labels">Username: </label>
          <input
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            onChange={inputChange}
            value={formState.username}
          />
          {errors.username.length > 0 ? (
            <p className="error">{errors.username}</p>
          ) : null}

          <label htmlFor="password" className="labels">Password: </label>
          <input
           placeholder="Password"
            type={password ? "text" : "password"}
            id="password"
            name="password"
            onChange={inputChange}
            value={formState.password}
          />
          <i onClick={togglePassword} title="Hide/Unhide">{eye}</i>
          {errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
          ) : null}

          <button type="submit" disabled={buttonIsDisabled}>
            Sign Up
          </button>
        </fieldset>
      </form>
    </div>
  );
}