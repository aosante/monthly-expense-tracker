import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import { TrackerContext } from '../../context/tracker/TrackerState';
import { AuthContext } from '../../context/auth/AuthState';
import { numberWithCommas } from '../../utils/format.js';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 5px 0px #eaeaea',
    color: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '10px',
    margin: '10px 0',
  },
  transactionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '70%',
  },
  button: {
    cursor: 'pointer',
    backgroundColor: '#e74c3c',
    border: 0,
    color: '#fff',
    fontSize: '20px',
    lineHeight: '20px',
    padding: '2px 5px',
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translate(-100%, -50%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  icon: {
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.1)',
    },
  },
  plus: {
    borderRight: '5px solid #2ecc71',
  },
  minus: {
    borderRight: '5px solid #c0392b',
  },
}));

const Transaction = ({ transaction: { _id, text, amount } }) => {
  const { deleteTransaction } = useContext(TrackerContext);
  const { loadUser } = useContext(AuthContext);
  const classes = useStyles();

  const onDelete = async () => {
    await deleteTransaction(_id);
    loadUser();
  };
  return (
    <li
      className={`${classes.root} ${amount > 0 ? classes.plus : classes.minus}`}
    >
      <div className={classes.transactionContainer}>
        {text}{' '}
        <span>
          {amount > 0
            ? `$${numberWithCommas(amount)}`
            : `-$${numberWithCommas(Math.abs(amount))}`}
        </span>
      </div>
      <DeleteIcon
        className={classes.icon}
        color="secondary"
        onClick={() => onDelete()}
      />
    </li>
  );
};

export default Transaction;
