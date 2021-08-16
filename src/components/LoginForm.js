import React from "react";
import { useHistory } from "react-router";

export const LoginForm = () => {
  const history = useHistory();

  return (
    <div className="form">
      <div className="login-form">
        <h3>Login</h3>
        <div className="inputs-box">
          <input placeholder="Login"></input>
          <input placeholder="Password"></input>
        </div>
        <div className="buttons-box">
          <button>Sign in</button>
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
