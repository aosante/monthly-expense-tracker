import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../../context/auth/AuthState';
import { TrackerContext } from '../../context/tracker/TrackerState';
import { numberWithCommas } from '../../utils/format';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  iconContainer: {
    textAlign: 'right',
    '@media(max-width:750px)': {
      textAlign: 'center',
      marginBottom: '1em',
    },
  },
  icon: {
    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  },
  editForm: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  balanceTitle: {
    margin: '1em auto',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '@media(max-width:750px)': {
      flexDirection: 'column',
    },
  },
  btn: {
    marginBottom: '1em',
    width: '85%',
  },
}));

const Balance = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateAmount, reset } = useContext(AuthContext);
  const { getTransactions } = useContext(TrackerContext);
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await updateAmount(data);
    setIsEditing(false);
  };

  const resetMonth = async () => {
    await reset();
    getTransactions();
  };

  const editForm = (
    <div>
      <form
        method="PUT"
        onSubmit={handleSubmit(onSubmit)}
        className={classes.editForm}
      >
        <TextField
          variant="filled"
          label="Amount"
          required
          id="amount"
          name="amount"
          type="number"
          inputRef={register({ required: true, min: 1 })}
          autoFocus
          error={errors.amount ? true : false}
          helperText={
            errors.amount &&
            'You must enter an amount of at least one to be able to start'
          }
        />
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btn}
          >
            Update
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            variant="contained"
            color="secondary"
            className={classes.btn}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );

  const Caption = () =>
    user && !user.amountChanged ? (
      <Typography variant="caption" color="primary">
        Enter your monthly budget or limit to start.
      </Typography>
    ) : null;

  const ResetButton = () =>
    user && user.amountChanged ? (
      <div className={classes.iconContainer}>
        <Button
          onClick={() => resetMonth()}
          variant="contained"
          color="secondary"
        >
          Reset
        </Button>
      </div>
    ) : null;

  return (
    <div className={classes.root}>
      {user && !user.amountChanged && !isEditing ? (
        <div className={classes.iconContainer}>
          <EditIcon
            onClick={() => setIsEditing(true)}
            className={classes.icon}
            color="primary"
          />
        </div>
      ) : null}
      <ResetButton />
      <Caption />
      <div className={classes.balanceTitle}>
        <h4>Your Budget</h4>
        <h1>${user && numberWithCommas(user.initialAmount.toFixed(2))}</h1>
        <h4>Your Balance</h4>
        {isEditing ? (
          editForm
        ) : (
          <h1>${user && numberWithCommas(user.amount.toFixed(2))}</h1>
        )}
      </div>
    </div>
  );
};

export default Balance;
