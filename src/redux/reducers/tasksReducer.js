const tasksReducer = (state = {}, action) => {
  console.log('in tasksReducer');
  switch (action.type) {
    case "SET_TASK":
      return action.payload;
    default:
      return state;
  }
};

export default tasksReducer;
