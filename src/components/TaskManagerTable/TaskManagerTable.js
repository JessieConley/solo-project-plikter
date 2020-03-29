import React, { Component } from "react";
import { connect } from "react-redux";
import "./TaskManagerTable.css";

class TaskManagerTable extends Component {
  state = {
    taskId: "",
    taskStatus: false,
 
  };
//Fires on page load
  componentDidMount = () => {
    this.props.dispatch({ type: "SET_TASK_1" });
    this.displaySelectedTasks();
  };

  // Add selected task to user_task db table for childId
  addTask = event => {
    console.log("in addTask", this.props.activeChild);
    event.preventDefault();
    if (this.state.taskId) {
      this.props.dispatch({
        type: "SET_SELECTED_TASK",
        payload: {
          userId: this.props.user.id,
          childId: this.props.activeChild.id,
          taskId: this.state.taskId,
          taskStatus: this.state.taskStatus,
        }
      });
    } else {
      console.log("in addTask else block");
      this.props.dispatch({ type: "ADD_TASK_INPUT_ERROR" });
    }
  }; // end addTask

  //Display selected task in Child's Responsibility Chart table as tasks are selected
  displaySelectedTasks = () => {
    console.log("in displaySelectedTasks");
    this.props.dispatch({
      type: "FETCH_TASK_1",
      childId: this.props.activeChild.id,
    });
  };

  //Capture task name selection from dropdown to display on dom after adding to child's chart
  handleAddTask = propertyName => event => {
    console.log("in handleAddTask", propertyName, event);
    this.setState({
      [propertyName]: event.target.value
    });
  };

  // handleAddDueDate = (inputText, event) => {
  //   console.log("in handleDueDate", inputText, event);
  //   this.setState({
  //     inputText: event.target.value
  //   });
  // }

  //Delete task from table
  deleteTask = (remove, childId) => {
    console.log("in deleteTask", remove);
    this.props.dispatch({ type: "REMOVE_TASK", payload: remove, childId });
    // this.displaySelectedTasks();
  };

  //Update task status to complete once completed
  updateTaskStatus = (update, childId, complete) => {
    console.log("in updateTaskStatus", update);
    this.props.dispatch({
      type: "CHANGE_TASK_STATUS",
      payload: update,
      childId,
      complete
    });
  };

  //Function to take user back to user home
    backToUserPage = () => {
      this.props.history.push("/home");
    };

  // Function to advance user to Add New Task page
    // addNewTaskClick = () => {
    //   this.props.history.push("/add-new-task");
    // };

  render() {
    console.log("in task component with", this.props.activeChild);
    return (
      <div className="TaskManagerTable">
        <h2 className="chartNameHeader">
          {this.props.activeChild.name}'s Responsibility and Behavior Chart
        </h2>
        <center>
          <h3 className="formheader">
            What are {this.props.activeChild.name}'s responsibilities and behaviors for today?
          </h3>
        </center>
        <form onSubmit={this.addTask}>
          <div>
            {this.props.tasks.length > 0 && (
              <>
                <label className="tasks" htmlFor="Tasks">Select Responsibility or Behavior:</label>
                <select className="taskDropDown"  onChange={this.handleAddTask("taskId")}>
                  {this.props.tasks.map(taskNames => {
                    return (
                      <option  className="formOption" key={taskNames.id} value={taskNames.id}>
                        {taskNames.task_name}
                      </option>
                    );
                  })}
                </select>
              </>
            )}
          </div>
          <br></br>

          {/* <p>When should these responsibilities be done?</p>
          <input
            placeholder="daySelect"
            onChange={event => this.handleAddDueDate("taskDue", event)}
          /> */}

          <input
            className="addTask"
            type="submit"
            name="submit"
            value="Add Task"
          />
        </form>

        <div>
          <>
            <table>
              <thead>
                <tr>
                  <th>Responsibility Name:</th>
                  {/* <th>Complete Responsibility By:</th> */}
                  <th>Responsibility Status:</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.props.childTable.length > 0 && (
                  <>
                    {this.props.childTable.map(taskNames => {
                      return (
                        <tr>
                          <td key={taskNames.id} value={taskNames.id}>
                            {taskNames.task_name}
                          </td>

                          <td>
                            <button
                              className="statusButton"
                              onClick={() =>
                                this.updateTaskStatus(
                                  taskNames.id,
                                  taskNames.child_id,
                                  !taskNames.complete
                                )
                              }
                            >
                              {taskNames.complete ? (
                                <span role="img" aria-label="star">
                                  ⭐ Complete
                                </span>
                              ) : (
                                <span role="img" aria-label="blackSquare">
                                  🔲 Incomplete
                                </span>
                              )}
                            </button>
                          </td>
                          <td>
                            <center>
                              <button
                                className="deleteButton"
                                onClick={() =>
                                  this.deleteTask(
                                    taskNames.id,
                                    taskNames.child_id
                                  )
                                }
                              >
                                <span role="img" aria-label="blackSquare">
                                  <span role="img" aria-label="blackSquare">
                                    ❎
                                  </span>
                                </span>
                              </button>
                            </center>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </>
          <br></br>
          <br></br>
        </div>
        <div>
          <center>
            <button className="backButton" onClick={this.backToUserPage}>Back</button>
          </center>
        </div>
        <br></br>
        <br></br>
        {/* <div>
          <button>Create New Tasks</button>
        </div> */}
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
  tasks: state.tasks,
  childTable:state.tasksTableReducer,
  activeChild: state.activeChildReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TaskManagerTable);

