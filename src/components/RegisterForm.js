import React from "react";
import { useHistory } from "react-router";

export const RegisterForm = () => {
  const history = useHistory();
  return (
    <div className="form">
      <div className="register-form">
        <h3>Register</h3>
        <div className="inputs-box">
          <input placeholder="Login"></input>
          <input placeholder="E-mail"></input>
          <input placeholder="Password"></input>
          <input placeholder="Repeat password"></input>
        </div>
        <div className="buttons-box">
          <button>Sign up</button>
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
