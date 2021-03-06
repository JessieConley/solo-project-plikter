import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your username and password!';
    case 'LOGIN_FAILED':
      return 'Oops! The username and password didn\'t match. Try again!';
    case 'LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Choose a username and password!';
    case 'REGISTRATION_FAILED':
      return 'Oops! That didn\'t work. The username might already be taken. Try again!';
    default:
      return state;
  }
};

const addChildMessage = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_ADD_CHILD_ERROR":
      return "";
    case "ADD_CHILD_INPUT_ERROR":
      return "Choose a child name and their date of birth!";
    case "ADDING_CHILD_FAILED":
      return "Oops! That didn't work. Try again!";
    default:
      return state;
  }
};

const addTaskMessage = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_ADD_TASK_ERROR":
      return "";
    case "ADD_TASK_INPUT_ERROR":
      return "Choose a task name and due date!";
    case "ADDING_TASK_FAILED":
      return "Oops! That didn't work. Try again!";
    default:
      return state;
  }
};
// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  addChildMessage,
  addTaskMessage,
});
