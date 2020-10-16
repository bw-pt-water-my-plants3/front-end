import React, { useState, useEffect } from "react";
import * as yup from "yup";

export default function RegisterForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    confirmation: ""
  });

  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  const handleChange = (e) => {
    const newFormObj = { ...formState, [e.target.name]: e.target.value };
    setFormState(newFormObj);
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    email: yup.string().email(),
    phone: yup.string().required(),
    username: yup.string().required("Username is required."),
    confirmation: yup.string().required("Enter a valid password")
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log("Is my form valid?", valid);
      setButtonIsDisabled(!valid);
    });
  }, [formState]);

  return (
    <div>
      <form>
        <fieldset>
          <legend>Register</legend>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formState.name}
            required
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formState.email}
            required
          />
          <label htmlFor="phone">Phone number: </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            value={formState.phone}
            required
          />
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={formState.username}
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formState.password}
            required
          />
          <label htmlFor="confirmation">Re-enter password: </label>
          <input
            type="password"
            id="confirmation"
            name="confirmation"
            onChange={handleChange}
            value={formState.confirmation}
            required
          />

          <button type="submit" disabled={buttonIsDisabled}>
            Sign Up
          </button>
        </fieldset>
      </form>
    </div>
  );
}
