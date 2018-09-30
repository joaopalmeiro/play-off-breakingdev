import React, {Component} from 'react';
import { Route, Link } from "react-router-dom";

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {showAbout: 'true'};

    this.ShowAbout = this.ShowAbout.bind(this);
  }

  ShowAbout(log) {
    this.setState({showAbout: 'false'});
  }

  render() {

    return (
      <div className = "WelcomeMessage">
        <h1>Welcome, {this.props.username}!</h1>

        <h3>{this.props.message}</h3>
        <Link to="/about"><button>{this.props.messageButton}</button></Link>
      </div>
    );
  }

}

export default Welcome;
