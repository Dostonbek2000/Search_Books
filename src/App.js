import React from "react";
import Reusable from "./components/Reusable";
import Search from "./components/Search";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Search />} />
        <Route path="/reusable" render={() => <Reusable />} />
      </Switch>
    </Router>
  );
};

export default App;
