import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../../context/auth/AuthState';
import { numberWithCommas } from '../../utils/format';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  iconContainer: {
    textAlign: 'right',
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
}));

const Balance = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateAmount } = useContext(AuthContext);
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await updateAmount(data);
    setIsEditing(false);
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
          defaultValue={0}
          error={errors.amount ? true : false}
          helperText={
            errors.amount &&
            'You must enter an amount of at least one to be able to start'
          }
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
        <Button
          onClick={() => setIsEditing(false)}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
      </form>
    </div>
  );

  const Caption = () =>
    user && !user.amountChanged ? (
      <Typography variant="caption" color="primary">
        Enter your monthly budget or limit to start.
      </Typography>
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
      <Caption />
      <h4>Your Balance</h4>
      {isEditing ? (
        editForm
      ) : (
        <h1>${user && numberWithCommas(user.amount.toFixed(2))}</h1>
      )}
    </div>
  );
};

export default Balance;
