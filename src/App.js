import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AuthScreen from "./components/Screen/AuthScreen";
import HomeScreen from "./components/Screen/HomeScreen";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/home" exact>
          <HomeScreen />
        </Route>
        <AuthScreen />
      </Switch>
    </Fragment>
  );
}

export default App;
