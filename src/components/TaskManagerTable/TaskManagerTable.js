import React, { Component } from "react";
import { connect } from "react-redux";

class TaskManagerTable extends Component {
  state = {
    taskId: "",
    taskStatus: false,
    value: 'Monday'
  };

  componentDidMount = () => {
    // console.log("in component did mount");
    this.props.dispatch({ type: "SET_TASK_1" });
    this.displaySelectedTasks();
  };

  // Add selected task to user_task db
  addTask = event => {
    console.log("in addTask", this.props.activeChildId);
    event.preventDefault();
    if (this.state.taskId) {
      this.props.dispatch({
        type: "SET_SELECTED_TASK",
        payload: {
          userId: this.props.user.id,
          childId: this.props.activeChildId,
          taskId: this.state.taskId,
          taskStatus: this.state.taskStatus
        }
      });
    } else {
      console.log('in addTask else block');
      this.props.dispatch({ type: "ADD_TASK_INPUT_ERROR" });
    }
  }; // end addTask

  displaySelectedTasks = () => {
    console.log("in displaySelectedTasks");
    this.props.dispatch({ type: "FETCH_TASK_1", childId: this.props.activeChildId});
  };

  handleAddTask = propertyName => event => {
    console.log( 'in handleAddTask', propertyName, event);
    this.setState({
      [propertyName]: event.target.value
    });
  };

  //Function to advance user to Add New Task page
  //   addNewTaskClick = () => {
  //     this.props.history.push("/add-new-task");
  //   };

  render() {
  console.log("in task component with", this.state);
    return (
      <div className="TaskManagerTable">
        <h2>Select Tasks and Due Date</h2>
        <form onSubmit={this.addTask}>
          <p>Task Selection:</p>

          <div>
            {this.props.tasks.length > 0 && (
              <>
                <label htmlFor="Tasks">Select Task:</label>
                <select
                  name="taskSelect"
                  onChange={this.handleAddTask("taskId")}
                >
                  {this.props.tasks.map(taskNames => {
                    return (
                      <option key={taskNames.id} value={taskNames.id}>
                        {taskNames.task_name}
                      </option>
                    );
                  })}
                </select>
              </>
            )}
          </div>

          <p>Due Date:</p>
          <select
            value={this.state.value}
            name="daySelect"
            onChange={this.handleAddTask("daySelect")}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
          <br></br>
          <br></br>
          <input
            className="addTask"
            type="submit"
            name="submit"
            value="Add Task"
          />
        </form>

        <br></br>
        <br></br>

        <div>
          <>
            <table>
              <thead>
                <tr>
                  <th>Task:</th>
                  <th>Day Due:</th>
                  <th>Status:</th>
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
                          <td>Monday</td>
                          <td>
                            <button>
                              {taskNames.complete ? "Complete" : "Incomplete"}
                            </button>
                          </td>
                          <td>
                            <button>Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </>
        </div>
        <div>
          <button>Create New Tasks</button>
        </div>
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
  activeChildId: state.activeChildReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TaskManagerTable);

