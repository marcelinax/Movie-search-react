import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { LoginForm } from "components/LoginForm";
import { MoviesList } from "components/MoviesList";
import React from "react";
import { RegisterForm } from "components/RegisterForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            {/* <LoginForm /> */}
            <MoviesList />
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
