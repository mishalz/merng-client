import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Loader, Dimmer } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/Auth";
import classes from "./Register.module.css";
import useForm from "../hooks/useForm";
import { LOGIN_USER } from "../queries/login-user";

function Login() {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialState = {
    username: "",
    password: "",
  };
  const { inputs, onChangeHandler, onSubmitHandler } = useForm(
    initialState,
    logUserCallback
  );
  const [logUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      AuthCtx.login(userData);
      navigate("/", { replace: true });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: inputs,
  });
  function logUserCallback() {
    logUser();
  }

  return (
    <div className={classes["form-container"]}>
      <Form onSubmit={onSubmitHandler} noValidate>
        <h1>Login</h1>
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
        <Button type="submit" primary>
          Login
        </Button>
        {errors.general && (
          <p className={classes["error-message"]}>{errors.general}</p>
        )}
      </Form>
      {loading && (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      )}
    </div>
  );
}

export default Login;
