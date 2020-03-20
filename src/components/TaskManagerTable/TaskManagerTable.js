import React, { Component } from "react";

class TaskManagerTable extends Component {
  //Set up buttonClick function to takes user back to their account home page
  buttonClick = () => {
    this.props.history.push("/home");
  };
  render() {
    return <div className="TaskManagerTable">
      <h2>Select Tasks and Due Date</h2>
      
    

     
    

    </div>
  }
}

export default TaskManagerTable;
