import React from "react";
import apiUrl from "./../config/apiUrl";
import axios from "axios";
import { logInUser } from "states/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useRef } from "react";

export const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLoginRef = useRef();
  const userPasswordRef = useRef();

  const tryLogin = async () => {
    const login = userLoginRef.current.value;
    const password = userPasswordRef.current.value;

    const form = {
      login,
      password,
    };
    const res = await axios.post(`${apiUrl}login`, form);
    if (res.data.error) {
      window.alert(res.data.message);
    } else {
      const token = res.data.token;
      const user = await axios.get(`${apiUrl}me`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(
        logInUser({
          token,
          login,
          email: user.data.email,
        })
      );
    }
  };

  return (
    <div className="form">
      <div className="login-form">
        <h3>Login</h3>
        <div className="inputs-box">
          <input placeholder="Login" ref={userLoginRef}></input>
          <input placeholder="Password" ref={userPasswordRef}></input>
        </div>
        <div className="buttons-box">
          <button onClick={tryLogin}>Sign in</button>
          <button
            onClick={() => {
              history.push("/register");
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
