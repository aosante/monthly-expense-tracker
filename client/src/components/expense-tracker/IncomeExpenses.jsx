import React, { useContext } from 'react';
import styled from 'styled-components';
import { TrackerContext } from '../../context/tracker/TrackerState';
import { numberWithCommas } from '../../utils/format';

const IncomeExpensesContainer = styled.div`
  background-color: #fff;
  box-shadow: var(--box-shadow);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  div {
    flex: 1;
    text-align: center;
  }
  div:first-of-type {
    border-right: 1px solid #dedede;
  }
  div p {
    font-size: 20px;
    letter-spacing: 1px;
    margin: 5px 0;
  }

  #money-plus {
    color: #2ecc71;
  }

  #money-minus {
    color: #c0392b;
  }
`;

const IncomeExpenses = () => {
  const { transactions } = useContext(TrackerContext);
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
    <IncomeExpensesContainer>
      <div>
        <h4>Income</h4>
        <p id="money-plus">+${numberWithCommas(incomes)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="money-minus">-${numberWithCommas(expenses)}</p>
      </div>
    </IncomeExpensesContainer>
  );
};

export default IncomeExpenses;
