import React, { useContext } from 'react';
import styled from 'styled-components';
import { TrackerContext } from '../../context/tracker/TrackerState';
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
`;

const Transaction = ({ transaction: { _id, text, amount } }) => {
  const { deleteTransaction } = useContext(TrackerContext);
  return (
    <TransactionItem className={amount > 0 ? 'plus' : 'minus'}>
      {text}{' '}
      <span>
        {amount > 0
          ? `$${numberWithCommas(amount)}`
          : `-$${numberWithCommas(Math.abs(amount))}`}
      </span>
      <button onClick={() => deleteTransaction(_id)}>x</button>
    </TransactionItem>
  );
};

export default Transaction;
