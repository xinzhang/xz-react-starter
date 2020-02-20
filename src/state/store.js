import React, { useReducer } from 'react';

export const Store = React.createContext('');

const initialState = {
  users: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_USERS':
      return {
        ...state,
        users: [...action.payload],
      };
    default:
      return state;
  }
}

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
