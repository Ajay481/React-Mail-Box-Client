import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AuthScreen from "./components/Screen/AuthScreen";
import InboxScreen from "./components/Screen/InboxScreen";
import ComposeScreen from "./components/Screen/ComposeScreen";
import ViewCard from "./components/Card/ViewCard";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/inbox" exact>
          <InboxScreen />
        </Route>
        <Route path="/compose" exact>
          <ComposeScreen />
        </Route>
        <Route path="/view/:id" exact>
          <ViewCard />
        </Route>
        <AuthScreen />
      </Switch>
    </Fragment>
  );
}

export default App;
