import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-s-alert';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage
} from '../utils/storage';
import indexImg from '../../public/assets/img/index.svg';
import Dashboard from './Dashboard.js';
import LoginForm from './LoginForm.js';
import SignupForm from './SignupForm.js';
import Welcome from './Welcome.js';



class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
      showSignUp: true,
      username: ''
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);

    this.logout = this.logout.bind(this);

    this.onChangeToSignIn = this.onChangeToSignIn.bind(this);
    this.onChangeToSignUp = this.onChangeToSignUp.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify the token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
              username: json.username
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpUsername,
      signUpEmail,
      signUpPassword
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // POST request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: Alert.success('You have successfully signed up!', {
              position: 'top-right',
              effect: 'jelly',
            }),
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpUsername: ''
          });
        }
        else {
          this.setState({
            signUpError: Alert.error(json.message, {
              position: 'top-right',
              effect: 'jelly',
            }),
            isLoading: false
          });
        }

      });

  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // POST request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: Alert.success('You have successfully signed in!', {
              position: 'top-right',
              effect: 'jelly',
            }),
            isLoading: false,
            username: json.user,
            signInEmail: '',
            signInPassword: '',
            token: json.token
          });
        } else {
          this.setState({
            signInError: Alert.error(json.message, {
              position: 'top-right',
              effect: 'jelly',
            }),
            isLoading: false
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });

    console.log("Hey");
    Alert.success('You have logged out', {
      position: 'top-right',
      effect: 'jelly',
    });

    const obj = getFromStorage('the_main_app');

    if (obj && obj.token) {
      const { token } = obj;
      // Verify the token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onChangeToSignIn() {
    this.setState({
      showSignUp: false
    });
  }

  onChangeToSignUp() {
    this.setState({
      showSignUp: true
    });
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpUsername,
      signUpEmail,
      signUpPassword,
      signUpError,
      showSignUp,
      username
    } = this.state;

    let form;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
        if (showSignUp) {
          form = <SignupForm
                    username = {signUpUsername}
                    changeUsername = {this.onTextboxChangeSignUpUsername}
                    email = {signUpEmail}
                    changeEmail = {this.onTextboxChangeSignUpEmail}
                    password = {signUpPassword}
                    changePassword = {this.onTextboxChangeSignUpPassword}
                    signUp = {this.onSignUp}
                    changeToSignIn = {this.onChangeToSignIn} />;
        } else {
          form = <LoginForm
                    email = {signInEmail}
                    changeEmail = {this.onTextboxChangeSignInEmail}
                    password = {signInPassword}
                    changePassword = {this.onTextboxChangeSignInPassword}
                    signIn = {this.onSignIn}
                    changeToSignUp = {this.onChangeToSignUp} />;
        }

      return (

        <div className="container">
          <Welcome username = {"Player"} message = {"Forget the wall! Now you can find new friends and opponents to practice and play your favorite sports! Should we start? ;)"} messageButton = {"Learn more about us"}/>

          {form}

          <div id="background-index" dangerouslySetInnerHTML={{ __html: indexImg }}></div>
      </div>
      );
    }

    return(
      <div className="container">
        <Welcome username = {username} message = {"Are you ready for a new Game? ;)"} messageButton = {"More info"}/>
        <Dashboard logout={this.logout}/>

        <div id="background-index" dangerouslySetInnerHTML={{ __html: indexImg }}></div>

      </div>
    );
  }
}

export default Homepage;
