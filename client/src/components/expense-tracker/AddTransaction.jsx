import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@material-ui/core';

import { AuthContext } from '../../context/auth/AuthState';
import { TrackerContext } from '../../context/tracker/TrackerState';

const AddTransaction = () => {
  const { addTransaction } = useContext(TrackerContext);
  const { user, loadUser } = useContext(AuthContext);
  const { register, errors, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await addTransaction(data);
    await loadUser();
    reset();
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          color="primary"
          margin="normal"
          required
          fullWidth
          id="text"
          name="text"
          label="Description"
          autoComplete="text"
          autoFocus
          inputRef={register({ required: true })}
          error={errors.text ? true : false}
          helperText={
            errors.text && 'You must provide the transaction description'
          }
        />
        <TextField
          color="primary"
          margin="normal"
          required
          fullWidth
          id="amount"
          name="amount"
          label="Amount"
          autoComplete="text"
          type="number"
          autoFocus
          inputRef={register({ required: true })}
          error={errors.amount ? true : false}
          helperText={
            errors.amount && "You must provide the transaction's amount"
          }
        />
        {user && !user.amountChanged ? (
          <Typography variant="caption" color="primary">
            You must first enter your monthly budget or limit to be able to add
            a new transaction
          </Typography>
        ) : null}
        <Button
          style={{ marginTop: '40px' }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={user && !user.amountChanged}
        >
          Add Transaction
        </Button>
      </form>
    </>
  );
};

export default AddTransaction;
