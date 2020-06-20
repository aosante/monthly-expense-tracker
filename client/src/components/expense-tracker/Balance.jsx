import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import { numberWithCommas } from '../../utils/format';

const Balance = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Your Balance</h4>
      <h1>${user && numberWithCommas(user.amount.toFixed(2))}</h1>
    </div>
  );
};

export default Balance;
