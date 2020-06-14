import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExpenseTracker from './components/expense-tracker/ExpenseTracker';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import PrivateRoute from './components/routing/PrivateRoute';

import { AuthContext } from './context/auth/AuthState';
import { TrackerProvider } from './context/tracker/TrackerState';

import './App.scss';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <TrackerProvider>
        <Navbar />
        <Alert />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <PrivateRoute
            exact
            path="/tracker"
            component={ExpenseTracker}
          ></PrivateRoute>
        </Switch>
        <Footer />
      </TrackerProvider>
    </Router>
  );
};

export default App;
