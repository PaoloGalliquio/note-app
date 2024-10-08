import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const usePutRequest = () => {
  const { state, dispatch } = useContext(AuthContext);
  const urlApiBackend = import.meta.env.VITE_BACKEND_URL;

  const executePutRequest = (api, payload) => {
    return axios
      .put(`${urlApiBackend}${api}`, payload, {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, PUT, DELETE, OPTIONS",
          Authorization: "Bearer " + state.token,
        },
      })
      .catch((response) => {
        manageResponse(response);
        return response;
      });
  };

  const manageResponse = (response) => {
    if (response.response !== undefined) {
      if (response.response.status === 401) {
        redirectToLogIn(dispatch);
        mostrarMensajeSesionExpirada(dispatch);
      }
    }
  };

  function mostrarMensajeSesionExpirada(dispatch) {
    dispatch({
      type: "SHOW_MESSAGE_EXPIRED_SESSION",
    });
  }

  function redirectToLogIn(dispatch) {
    dispatch({
      type: "LOGOUT",
    });
  }

  return [executePutRequest];
};
