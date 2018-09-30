import React, {Component} from 'react';

class SignupForm extends Component {

  render() {
    return (
      <div className="Dashboard">
        <div className="Form">

        <h2>Sign up now!</h2>
          <form>
              <input type="text" placeholder="Choose a username" value={this.props.username} onChange={this.props.changeUsername}/><br/>
              <input type="email" name="email" placeholder="Enter your email" value={this.props.email} onChange={this.props.changeEmail}/><br/>
              <input type="password" name="password" placeholder="Pick a new password!" value={this.props.password} onChange={this.props.changePassword}/><br/>
              <input type="password" name="repeatPassword" placeholder="Repeat your password..."/><br/>

              <p>Or sign up with</p>
              <button className="buttonBubble"><i className="fab fa-google fa-2x"></i></button>
              <button className="buttonBubble"><i className="fab fa-facebook-f fa-2x"></i><br/></button><br/>

              <button onClick={this.props.signUp}>Submit</button>
          </form>

          <a href="JavaScript:Void(0);" onClick={this.props.changeToSignIn}><p>Login if you are already a Player!</p></a>
          </div>
        </div>
      );
  }

}

export default SignupForm;
