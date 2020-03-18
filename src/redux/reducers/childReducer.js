const childReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CHILD":
      return action.payload;
    case "UNSET_CHILD":
      return {};
    default:
      return state;
  }
};

export default childReducer;