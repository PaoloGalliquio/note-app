import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useGetRequest = () => {
  const { state, dispatch } = useContext(AuthContext);
  const urlApiBackend = import.meta.env.VITE_BACKEND_URL;

  const executeGetRequest = (api) => {    
    if (api) {
      return axios
        .get(`${urlApiBackend}${api}`, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
          },
        })
        .catch((response) => {
          manageResponse(response);
          return response;
        });
    }
  };

  function executeGetRequestCallback(functionThatReturnsAPI) {
    return function () {
      return executeGetRequest(functionThatReturnsAPI);
    };
  }

  const manageResponse = (response) => {
    if (response.response !== undefined) {
      if (response.response.status === 401) {
        redirectToLogIn(dispatch);
        showExpiredSessionMessage(dispatch);
      }
    }
  };

  function showExpiredSessionMessage(dispatch) {
    dispatch({
      type: "SHOW_MESSAGE_EXPIRED_SESSION",
    });
  }

  function redirectToLogIn(dispatch) {
    dispatch({
      type: "LOGOUT",
    });
  }

  return [executeGetRequest, executeGetRequestCallback];
};
