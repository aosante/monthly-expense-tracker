import React, { createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer';
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const initialState = [];

export const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }) => {
  const [alerts, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, alertType, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });
    // remove alert after a certain amount of time
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider value={{ setAlert, alerts }}>
      {children}
    </AlertContext.Provider>
  );
};
