import React, {Component, Link} from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Homepage.js';

class DashProfile extends Component {
  render() {
    return (
      <button className="Dashcard"><i className="fas fa-user"></i>&emsp;Profile</button>
    );
  }
}

class DashGames extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <button className="Dashcard"><i className="fas fa-gamepad"></i>&emsp;Games</button>
    );
  }
}

class DashNotification extends Component {
  render() {
    return (
      <button className="Dashcard"><i className="fas fa-bell"></i>&emsp;Notifications</button>
    );
  }
}

class DashSettings extends Component {
  render() {
    return (
      <button className="Dashcard"><i className="fas fa-cog"></i>&emsp;Settings</button>
    );
  }
}

class DashLogout extends Component {
  render() {
    return (
      <button onClick={this.props.logout} className="Dashcard"><i className="fas fa-door-open"></i>&emsp;Logout</button>
    );
  }
}

class Dashboard extends Component {

  render() {
    return (
      <div className="Dashboard">
        <DashProfile/>
        <DashNotification/>
        <DashGames/>
        <DashSettings/>
        <DashLogout logout={this.props.logout}/>
      </div>
    );
  }
}

export default Dashboard;
