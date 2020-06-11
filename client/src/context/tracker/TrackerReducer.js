import {
  GET_TRANSACTIONS,
  TRANSACTION_ERROR,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload,
        loading: false,
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, payload],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t._id !== payload),
      };
    default:
      return state;
  }
};
