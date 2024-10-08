import React, { createContext, useReducer } from "react";
import store from "store";

import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

const initialState = {
  isLoggedIn: store.get("is_auth"),
  user: {
    id: 1
  },
  token: store.get("token"),
};

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
};
