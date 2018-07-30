import store from './store';
import Routes from "./route/routes";
import { Provider } from 'react-redux';
import React, { Component } from "react";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <Routes />
      </div>
      </Provider>
    );
  }
}

export default App;
