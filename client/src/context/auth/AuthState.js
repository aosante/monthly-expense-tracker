import React, { createContext, useReducer, useContext } from 'react';
import AuthReducer from './AuthReducer';
import { AlertContext } from '../alert/AlertState';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';

const intialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const AuthContext = createContext(intialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, intialState);
  const { setAlert } = useContext(AlertContext);
  const { token, isAuthenticated, loading, user } = state;

  // Actions

  // loads user token
  const loadUser = async () => {
    // setAuth token if there is one (with setAuthToken from utils)
    if (localStorage.token) setAuthToken(localStorage.token);

    try {
      const res = await axios('/api/v1/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const registerUser = async ({ name, email, password }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post('/api/v1/users', body, config);
      await dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
      setAlert('Registered successfully!', 'success');
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert(error.msg, 'error'));
      }
      dispatch({ type: REGISTER_FAIL });
    }
  };

  const login = async ({ email, password }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post('/api/v1/auth', body, config);
      await dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert(error.msg, 'error'));
      }
      dispatch({ type: LOGIN_FAIL });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        loadUser,
        registerUser,
        login,
        logout,
        token,
        isAuthenticated,
        loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
