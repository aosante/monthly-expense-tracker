import React, { useContext } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';

import { TrackerContext } from '../../context/tracker/TrackerState';
import { AuthContext } from '../../context/auth/AuthState';
import { numberWithCommas } from '../../utils/format.js';

const TransactionItem = styled.li`
  background-color: #fff;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin: 10px 0;
  .transaction-container {
    display: flex;
    justify-content: space-between;
    width: 70%;
  }
  button {
    cursor: pointer;
    background-color: #e74c3c;
    border: 0;
    color: #fff;
    font-size: 20px;
    line-height: 20px;
    padding: 2px 5px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  button:hover {
    opacity: 1;
  }
  button:focus {
    outline: 0;
  }
  .plus {
    border-right: 5px solid #2ecc71;
  }
  .minus {
    border-right: 5px solid #c0392b;
  }
  .icon:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Transaction = ({ transaction: { _id, text, amount } }) => {
  const { deleteTransaction } = useContext(TrackerContext);
  const { loadUser } = useContext(AuthContext);

  const onDelete = async () => {
    await deleteTransaction(_id);
    loadUser();
  };
  return (
    <TransactionItem className={amount > 0 ? 'plus' : 'minus'}>
      <div className="transaction-container">
        {text}{' '}
        <span>
          {amount > 0
            ? `$${numberWithCommas(amount)}`
            : `-$${numberWithCommas(Math.abs(amount))}`}
        </span>
      </div>
      <DeleteIcon
        className="icon"
        color="secondary"
        onClick={() => onDelete()}
      />
    </TransactionItem>
  );
};

export default Transaction;
