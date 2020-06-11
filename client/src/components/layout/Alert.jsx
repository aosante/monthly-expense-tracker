import React, { useContext } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { AlertContext } from '../../context/alert/AlertState';

const AlertComponent = () => {
  const { alerts } = useContext(AlertContext);
  return alerts !== null && alerts.length > 0
    ? alerts.map((alert) => (
        <Alert key={alert.id} severity={alert.alertType}>
          <AlertTitle>{alert.alertType}</AlertTitle>
          {alert.msg}
        </Alert>
      ))
    : null;
};

export default AlertComponent;
