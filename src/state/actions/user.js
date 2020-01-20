export const loadUsers = async (payload, dispatch) => {
  let dispatchObj = {
    type: "LOAD_USERS",
    payload
  };
  return dispatch(dispatchObj);
};
