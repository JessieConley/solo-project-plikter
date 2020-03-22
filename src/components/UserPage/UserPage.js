import React, {Component} from 'react';
import { connect } from 'react-redux';

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
       activeChildId: event.target.dataset.id
     });
    this.props.history.push("/task-manager-table");
  }

  toAddChildForm = (event) => {
    this.props.history.push("/add-child-form");
  };

  render() {
    console.log('in user page with:', this.props.child);
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.user.name}!</h1>
        <h2>Who's responsibility chart are we working with today?</h2>
        {/* <div>{this.props.child.length}>Hello</div> */}
        
          <div className="childDisplay">
            <center>
              {this.props.child.length > 0 && 
              this.props.child.map(name => {
                // <div className="buttonDisplay" >
                return (
                  <button data-id={name.id} onClick={this.onChildButtonClick}>
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
          <button onClick={this.toAddChildForm}>Add Child</button>
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
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
