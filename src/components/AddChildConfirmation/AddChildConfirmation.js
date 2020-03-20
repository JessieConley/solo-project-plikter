import React, { Component } from "react";


class AddChildConfirmation extends Component {
  //Set up buttonClick function to takes user back to their account home page
  buttonClick = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <div className="AddChildConfirmation">
        <h1>Thank You!</h1>
        <h2>This child has been added to your account.</h2>
        <button onClick={this.buttonClick}>Home</button>
      </div>
    );
  }
}

export default AddChildConfirmation;