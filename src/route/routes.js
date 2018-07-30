import React from "react";
import Todos from "../views/todosView";
import Navbar from "../components/navbar/navbar";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

class TodosRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/todos" component={Todos} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default TodosRouter;
