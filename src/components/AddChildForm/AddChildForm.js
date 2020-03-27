import React, { Component } from "react";
import { connect } from "react-redux";
import "./AddChildForm.css";

class RegisterPage extends Component {
  state = {
    childName: "",
    dateOfBirth: ""
  };

  //Add child to user account and db
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
    this.props.history.push("/add-child-confirmation");
  }; // end addChild

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  }; //end handleInputChangeFor

  render() {
    return (
      <div>
        {this.props.errors.addChildMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.addChildMessage}
          </h2>
        )}
        <form onSubmit={this.addChild}>
          <h1 className="childNameEntry">Add New Child</h1>
          <div>
            <label htmlFor="childName">
              Child Name:
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
              Date of Birth:
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
                className="addChildButton"
                type="submit"
                name="submit"
                value="Save"
              />
            </center>
          </div>
        </form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user,
  childTable: state.tasksTableReducer,
  activeChild: state.activeChildReducer
});

export default connect(mapStateToProps)(RegisterPage);
