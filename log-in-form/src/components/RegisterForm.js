import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function RegisterForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    verifyPassword: ""
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
    verifyPassword: ""
  });



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
  };




  // onSubmit function
  const submitForm = (e) => {
    e.preventDefault()
    axios
      .post("https://reqres.in/api/users", formState)
      .then((resp) => {

        setPost(resp.data);

        setServerError(null)

        setFormState({
          name: "",
          email: "",
          phone: "",
          username: "",
          password: "",
          verifyPassword: ""
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
            type="password"
            id="password"
            name="password"
            onChange={inputChange}
            value={formState.password}
          />
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