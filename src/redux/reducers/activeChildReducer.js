const activeChildReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ACTIVE_CHILD":
      return action.activeChildId;
    default:
      return state;
  }
};

export default activeChildReducer;
