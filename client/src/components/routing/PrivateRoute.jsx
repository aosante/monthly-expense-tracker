import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          // TODO change url to /login after adding ladning page
          <Redirect to="/"></Redirect>
        ) : (
          <Component {...props}></Component>
        )
      }
    />
  );
};

export default PrivateRoute;
