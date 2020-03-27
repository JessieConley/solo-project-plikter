import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./LoginPage.css";

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  //Login an existing user
  login = (event) => {
    event.preventDefault();
    console.log("in loginUser with:", this.state);
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  //Takes in username and password to get to user account

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.loginMessage}
          </h2>
        )}

        <form onSubmit={this.login}>
          <center>
            <h2 className="parentHeader">Parent/Guardian Login</h2>
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
          </center>
          <div className="loginButton">
            <center>
              <input
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              />
            </center>
          </div>
        </form>

        <div className="newUser">
          <center>
            <p>New user?</p>
            <button
              className="signUpButton"
              type="button"
              // className="link-button"
              onClick={() => {
                this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
              }}
            >
              Sign Up
            </button>
          </center>
        </div>
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

export default connect(mapStateToProps)(LoginPage);
