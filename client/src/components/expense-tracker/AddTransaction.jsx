import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { TrackerContext } from '../../context/tracker/TrackerState';

const Form = styled.form`
  input {
    border: 1px solid #dedede;
    border-radius: 2px;
    display: block;
    font-size: 16px;
    padding: 10px;
    width: 100%;
  }
  label {
    display: inline-block;
    margin: 10px 0;
  }
  button {
    cursor: pointer;
    background-color: #40d0e0;
    box-shadow: var(--box-shadow);
    color: #fff;
    border: 0;
    display: block;
    font-size: 16px;
    margin: 10px 0 30px;
    padding: 10px;
    width: 100%;
  }
  button:focus {
    outline: 0;
  }
`;

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(TrackerContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: uuidv4(),
      text,
      amount: parseInt(amount),
    };
    addTransaction(newTransaction);
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <Form onSubmit={onSubmit}>
        <div>
          <label htmlFor="text">Text</label>
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            name="text"
            placeholder="Enter text..."
            value={text}
          />
        </div>
        <div>
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            name="amount"
            placeholder="Enter amount..."
            value={amount}
          />
        </div>
        <button>Add transaction</button>
      </Form>
    </>
  );
};

export default AddTransaction;
