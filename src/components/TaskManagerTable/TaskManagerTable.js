import React, { Component } from "react";
import { connect } from "react-redux";

class TaskManagerTable extends Component {

    state= {
        taskList:{
            newTask: '',
            taskDue: '',
            status: ''
        }
    }
    
  componentDidMount = () => {
      console.log('in component did mount');
    this.props.dispatch({type: "SET_TASK_1"})
  };


//   handleChange = (event) =>{
//       console.log(event.target.value);
      
//   }

// handleAddTask = () => {
//     console.log(this.state.tasks);
//     this.props.dispatch({ type: 'SET_TASK_POST', payload:this.state.taskList });
// }

//Function to advance user to Add New Task page
//   addNewTaskClick = () => {
//     this.props.history.push("/add-new-task");
//   };


  render() {
      console.log('in task component with', this.props.tasks[0]);
    return (
      <div className="TaskManagerTable">
        <h2>Select Tasks and Due Date</h2>
        <p>Task Selection:</p>

        <div>
          {this.props.tasks.length > 0 && (
            <>
              <label htmlFor="Tasks">Select Task:</label>
              <select>
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
        <select>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
        <br></br>
        <br></br>
        <button onClick={this.handleAddTask}>Add</button>

        <br></br>
        <br></br>

        <div>
          <button>Add New Tasks</button>
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
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TaskManagerTable);

