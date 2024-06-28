import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import SwaggerDocs from "./components/SwaggerUI";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/swagger" component={SwaggerDocs} />
          {/* Other routes */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
