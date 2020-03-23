const activeChildReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ACTIVE_CHILD":
      return action.activeChild;
    default:
      return state;
  }
};

export default activeChildReducer;
