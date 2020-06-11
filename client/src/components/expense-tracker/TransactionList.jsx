import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Transaction from './Transaction';
import { TrackerContext } from '../../context/tracker/TrackerState';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
`;

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(TrackerContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <List>
        {transactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </List>
    </>
  );
};

export default TransactionList;
