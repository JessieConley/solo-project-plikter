import React, { Component } from "react";
import { connect } from "react-redux";

class RegisterPage extends Component {
  state = {
    childName: "",
    dateOfBirth: "",
    
  };

  //Add child to user account
  addChild = event => {
    event.preventDefault();
    if (this.state.childName && this.state.dateOfBirth) {
      this.props.dispatch({
        type: "FETCH_CHILD",
        payload: {
          childName: this.state.childName,
          dateOfBirth: this.state.dateOfBirth,
          parentUserId: this.props.user.id
        }
      });
    } else {
      this.props.dispatch({ type: "ADD_CHILD_INPUT_ERROR" });
    }
  }; // end addChild

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  render() {
    return (
      <div>
        {this.props.errors.addChildMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.addChildMessage}
          </h2>
        )}
        <form onSubmit={this.addChild}>
          <h1>Add New Child</h1>
          <div>
            <label htmlFor="childName">
              Name:
              <input
                type="text"
                name="childName"
                value={this.state.childName}
                onChange={this.handleInputChangeFor("childName")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="dateOfBirth">
              Username:
              <input
                type="date"
                name="dateOfBirth"
                value={this.state.dateOfBirth}
                onChange={this.handleInputChangeFor("dateOfBirth")}
              />
            </label>
          </div>
          <div>
            <center>
              <input
                className="addChild"
                type="submit"
                name="submit"
                value="Add Child"
              />
            </center>
          </div>
        </form>

        {/* <button
            type="button"
            onClick={() => {
              this.props.dispatch({ type: "SET_CHILD" });
            }}
          >
            Add Child
          </button> */}
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user 
});

export default connect(mapStateToProps)(RegisterPage);
