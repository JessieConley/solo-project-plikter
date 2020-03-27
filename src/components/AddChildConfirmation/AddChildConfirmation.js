import React, { Component } from "react";
import "./AddChildConfirmation.css";


class AddChildConfirmation extends Component {
  //Set up buttonClick function to takes user back to their account home page
  buttonClick = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <div className="AddChildConfirmation">
        <center>
          <h1 className="thankYou">Thank You!</h1>
          <h2>This child has been added to your account.</h2>
          <button className="backHomeButton" onClick={this.buttonClick}> User Home</button>
        </center>
      </div>
    );
  }
}

export default AddChildConfirmation;