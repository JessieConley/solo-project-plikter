import React, {Component} from 'react';
import { connect } from 'react-redux';
import "./UserPage.css";

// import LogOutButton from '../LogOutButton/LogOutButton';

class UserPage extends Component {
  componentDidMount = () => {
    this.displayChildren();
  };

  //Function to get all children on user accoutn from DB
  displayChildren = () => {
    console.log("in displayChildren");
    this.props.dispatch({type: "SET_CHILD_1", parentId: this.props.user.id });
  };

  //Set up function to advance user to child task table on click
  onChildButtonClick = (event) =>{
     console.log("in toAddChildForm", event.target.dataset.id);
     this.props.dispatch({
       type: "SET_ACTIVE_CHILD",
       activeChild: {
        id: event.target.dataset.id,
        name: event.target.dataset.name
      }
     });

    this.props.history.push("/task-manager-table");
  }
//Advances user to Add Child form page upon click
  toAddChildForm = (event) => {
    this.props.history.push("/add-child-form");
  };

  render() {
    console.log('in user page with:', this.props.child);
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.user.name}!</h1>
        <h2>Who's responsibility chart are we working with today?</h2>
       
        
          <div className="childDisplay">
            <center>
              {this.props.child.length > 0 && 
              this.props.child.map(name => {
                // <div className="buttonDisplay" >
                return (
                  <button className="childNameButton" data-id={name.id} data-name={name.child_name} onClick={this.onChildButtonClick}>
                    {name.child_name}
                  </button>
                );
                // </div>; 
              })}
              <br></br>
              <br></br>
            </center>
            
          </div>
        <center>
          <button className="addChildButton" onClick={this.toAddChildForm}>Add Child</button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  child: state.child,
  childTable: state.tasksTableReducer,
  activeChild: state.activeChildReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
