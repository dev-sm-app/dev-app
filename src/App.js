import React, { Component } from 'react';
import { HashRouter as Router } from "react-router-dom"

import Header from "./components/Header/Header"
import routes from "./routing"
import NavBar from "./components/NavBar/NavBar"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            {routes}
            <NavBar />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
