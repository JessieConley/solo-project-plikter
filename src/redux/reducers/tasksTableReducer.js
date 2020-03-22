const tasksTableReducer = (state = {}, action) => {
  console.log("in tasksTableReducer");
  switch (action.type) {
    case "FETCH_TASK":
      return action.payload;
  
    default:
      return state;
  }
};

export default tasksTableReducer;
