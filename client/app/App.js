import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { BrowserRouter as Router } from "react-router-dom";
import './styles/App.scss';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
        <Router>
        <div className="App">
          <Navbar />
          <Alert stack={{limit: 1000}} />
        </div>
      </Router>
    );
  }
}

export default App;
