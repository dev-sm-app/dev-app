import React, { Component } from 'react';
import { HashRouter as Router } from "react-router-dom"

import routes from "./routing"
import NavBar from "./components/NavBar/NavBar"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="appBody">
            {routes}
            <div className="navBar">
              <NavBar />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
