import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Transaction from './Transaction';
import { TrackerContext } from '../../context/tracker/TrackerState';

const useStyles = makeStyles(() => ({
  list: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '40px',
  },
}));

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(TrackerContext);
  const classes = useStyles();

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className={classes.list}>
        {transactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
