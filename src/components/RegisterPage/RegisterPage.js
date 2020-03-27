import React, { Component } from 'react';
import {connect} from 'react-redux';
import "./RegisterPage.css";

class RegisterPage extends Component {
  state = {
    name: '',
    username: '',
    password: ''
    }
  
  //Create new user account upon registration
  registerUser = (event) => {
    event.preventDefault();
    if (this.state.name && this.state.username && this.state.password) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password
        }
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  } // end registerUser

  //Takes in new user account creds on entry
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <center>
          <form className="registerForm" onSubmit={this.registerUser}>
            <h2 className="registerH2">Register New User</h2>
            <div>
              <label htmlFor="name">
               Full  Name:
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChangeFor("name")}
                />
              </label>
            </div>
            <div>
              <label htmlFor="username">
                Username:
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor("username")}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </label>
            </div>
            <div>
              <input
                className="register"
                type="submit"
                name="submit"
                value="Register"
              />
            </div>
          </form>
        </center>
        <center>
          <button
            type="button"
            className="logInButton"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
            }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

