import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TrackerContext } from '../../context/tracker/TrackerState';
import { TextField, Button } from '@material-ui/core';

const AddTransaction = () => {
  const { addTransaction } = useContext(TrackerContext);
  const { register, errors, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log('adding transaction', data);
    // addTransaction(newTransaction);
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
          herlperText={
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
          autoFocus
          inputRef={register({ required: true })}
          error={errors.amount ? true : false}
          herlperText={
            errors.amount && 'You must provide the transaction description'
          }
        />
        <Button
          style={{ marginTop: '40px' }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Add Transaction
        </Button>
      </form>
    </>
  );
};

export default AddTransaction;
