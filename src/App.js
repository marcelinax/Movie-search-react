import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { LoginForm } from "components/LoginForm";
import { MoviesList } from "components/MoviesList";
import { RegisterForm } from "components/RegisterForm";

function App() {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <MoviesList /> : <LoginForm />}
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
