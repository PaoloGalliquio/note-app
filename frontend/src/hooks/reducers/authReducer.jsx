import store from "store";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      store.set('user', action.payload.user);
      store.set('token', action.payload.token);
      store.set('is_auth', true);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case "LOGOUT":
      store.remove('user');
      store.remove('token');
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
