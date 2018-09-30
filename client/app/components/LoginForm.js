import React, {Component} from 'react';

class LoginForm extends Component {

  render() {
    return (
      <div className="Dashboard">
        <div className="Form">

        <h2>Sign in now!</h2>
          <form method="post">
              <input type="email" name="email" placeholder="Enter your email" value={this.props.email} onChange={this.props.changeEmail}/><br/>
              <input type="password" name="password" placeholder="Pick a new password!" value={this.props.password} onChange={this.props.changePassword}/><br/>

              <p>Or sign in with</p>
              <button className="buttonBubble"><i className="fab fa-google fa-2x"></i></button>
              <button className="buttonBubble"><i className="fab fa-facebook-f fa-2x"></i><br/></button><br/>

              <button onClick={this.props.signIn}>Submit</button>
          </form>

          <a href="JavaScript:Void(0);" onClick={this.props.changeToSignUp}><p>Sign up now if you are a new Player!</p></a>
          </div>
        </div>
      );
  }

}

export default LoginForm;
