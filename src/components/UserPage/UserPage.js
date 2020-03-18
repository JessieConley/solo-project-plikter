import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = props => (
  <div>
    <h1 id="welcome">Welcome, {props.user.name}!</h1>
    {/* <p>Your ID is: {props.user.id}</p> */}
    {/* <LogOutButton className="log-in" /> */}
    <center>
      <p>Who's responsibility chart are we workin with today?</p>
      <button>Child Name 1</button>
      <br></br>
      <br></br>
      <button>Child Name 2</button>
      <br></br>
    </center>
    <br></br>
    <center>
      <button
        type="button"
        // className="link-button"
        onClick={() => {
          this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
        }}
      >
        Add Child
      </button>
    </center>
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
