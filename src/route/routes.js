import App from "../App";
import React from "react";
import Todos from "../views/todosView";
import Login from "../views/loginView";
import Signup from "../views/signupView";
import PrivateRoute from "./privateRoute";
import Dashboard from "../views/dashboardView";
import Navbar from "../components/navbar/navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class TodosRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            {/* <Route exact path="/" component={App} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/todos" component={Todos} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default TodosRouter;
