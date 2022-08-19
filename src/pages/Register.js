import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Loader, Dimmer } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/Auth";
import { REGISTER_USER } from "../queries/register-user";
import classes from "./Register.module.css";
import useForm from "../hooks/useForm";

function Register() {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };
  const { inputs, onChangeHandler, onSubmitHandler } = useForm(
    initialState,
    registerUserCallback
  );
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      AuthCtx.login(userData);
      navigate("/", { replace: true });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: inputs,
  });
  function registerUserCallback() {
    addUser();
  }
  return (
    <div className={classes["form-container"]}>
      <Form onSubmit={onSubmitHandler} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={inputs.username}
          onChange={onChangeHandler}
        />
        {errors.username && (
          <p className={classes["error-message"]}>{errors.username}</p>
        )}
        <Form.Input
          label="email"
          placeholder="email"
          name="email"
          type="email"
          value={inputs.email}
          onChange={onChangeHandler}
          error={errors.email ? true : false}
        />
        {errors.email && (
          <p className={classes["error-message"]}>{errors.email}</p>
        )}
        <Form.Input
          label="password"
          placeholder="password"
          name="password"
          type="password"
          value={inputs.password}
          error={errors.password ? true : false}
          onChange={onChangeHandler}
        />
        {errors.password && (
          <p className={classes["error-message"]}>{errors.password}</p>
        )}
        <Form.Input
          label="confirm Password"
          placeholder="confirmPassword"
          error={errors.confirmPassword ? true : false}
          name="confirmPassword"
          type="password"
          value={inputs.confirmPassword}
          onChange={onChangeHandler}
        />
        {errors.confirmPassword && (
          <p className={classes["error-message"]}>{errors.confirmPassword}</p>
        )}
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {loading && (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      )}
    </div>
  );
}

export default Register;
