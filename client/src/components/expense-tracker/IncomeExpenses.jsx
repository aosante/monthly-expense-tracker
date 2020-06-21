import React, { useContext } from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TrackerContext } from '../../context/tracker/TrackerState';
import { numberWithCommas } from '../../utils/format';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#f3f2f2',
    padding: theme.spacing(3),
    margin: '20px auto',
    justifyContent: 'space-around',
    boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.4)',
    borderRadius: '2px',
  },
  card: {
    margin: theme.spacing(1),
    width: theme.spacing(26),
    height: theme.spacing(16),
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },
  moneyPlus: {
    color: '#2ecc71',
  },
  moneyMinus: {
    color: '#c0392b',
  },
}));

const IncomeExpenses = () => {
  const { transactions } = useContext(TrackerContext);
  const classes = useStyles();
  const amounts = transactions.map((t) => t.amount);
  const incomes = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expenses = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  return (
    <div className={classes.root}>
      <Card className={classes.card} elevation={3}>
        <h4>Income</h4>
        <p className={classes.moneyPlus}>+${numberWithCommas(incomes)}</p>
      </Card>
      <Card className={classes.card} elevation={3}>
        <h4>Expense</h4>
        <p className={classes.moneyMinus}>-${numberWithCommas(expenses)}</p>
      </Card>
    </div>
  );
};

export default IncomeExpenses;
