import React from "react";
import apiUrl from "./../config/apiUrl";
import axios from "axios";
import { logInUser } from "states/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useRef } from "react";

export const RegisterForm = () => {
  const history = useHistory();
  const userLoginRef = useRef();
  const userEmailRef = useRef();
  const userPasswordRef = useRef();
  const userRepeatPasswordRef = useRef();
  const dispatch = useDispatch();

  const registerUser = async () => {
    const login = userLoginRef.current.value;
    const email = userEmailRef.current.value;
    const password = userPasswordRef.current.value;
    const repeatPassword = userRepeatPasswordRef.current.value;

    const form = {
      login,
      email,
      password,
    };
    if (password !== repeatPassword) {
      alert("The passwords do not match");
    } else {
      const res = await axios.post(`${apiUrl}register`, form);
      if (res.data.error) alert(res.data.message);
      else {
        const loginRes = await axios.post(`${apiUrl}login`, {
          login,
          password,
        });
        const token = loginRes.data.token;
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
        history.push("/");
      }
    }
  };

  return (
    <div className="form">
      <div className="register-form">
        <h3>Register</h3>
        <div className="inputs-box">
          <input placeholder="Login" ref={userLoginRef}></input>
          <input placeholder="E-mail" ref={userEmailRef}></input>
          <input placeholder="Password" ref={userPasswordRef}></input>
          <input
            placeholder="Repeat password"
            ref={userRepeatPasswordRef}
          ></input>
        </div>
        <div className="buttons-box">
          <button onClick={registerUser}>Sign up</button>
          <button
            onClick={() => {
              history.push("/");
            }}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
