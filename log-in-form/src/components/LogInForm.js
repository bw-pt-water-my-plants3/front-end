import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

export default function LoginForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });

  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  // post request
  const [post, setPost] = useState([]);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const newFormObj = { ...formState, [e.target.name]: e.target.value };
    setFormState(newFormObj);
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
          username: "",
          password: ""
        });
      })
      .catch((err) => {
        setServerError("oops! something happened!");
      });
  };

  console.log(formState);

  // add yup library

  const formSchema = yup.object().shape({
    username: yup.string().required("Name is required."),
    password: yup.string().required("Enter a valid password")
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
          <legend>Log In</legend>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
          <br />
          <br />

          <button type="submit" disabled={buttonIsDisabled}>
            Sign In
          </button>

          <Link to="/register">New User? </Link>
        </fieldset>
      </form>
    </div>
  );
}

