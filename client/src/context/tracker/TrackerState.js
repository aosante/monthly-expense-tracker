import React, { createContext, useReducer } from 'react';
import TrackerReducer from './TrackerReducer';
import axios from 'axios';
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  TRANSACTION_ERROR,
  DELETE_TRANSACTION,
} from '../types';

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const TrackerContext = createContext(initialState);

export const TrackerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TrackerReducer, initialState);

  // actions
  const getTransactions = async () => {
    try {
      const res = await axios('/api/v1/transactions');
      dispatch({ type: GET_TRANSACTIONS, payload: res.data });
    } catch (error) {
      dispatch({ type: TRANSACTION_ERROR, payload: error.response.data });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({ type: DELETE_TRANSACTION, payload: id });
    } catch (error) {
      dispatch({ type: TRANSACTION_ERROR, payload: error.response.data });
    }
  };

  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({ type: ADD_TRANSACTION, payload: res.data });
    } catch (error) {
      dispatch({ type: TRANSACTION_ERROR, payload: error.response.data });
    }
  };

  return (
    <TrackerContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};
