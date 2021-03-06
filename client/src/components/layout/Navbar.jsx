import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../../context/auth/AuthState';
import logo from '../../img/nav-logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: ' #fff',
    textDecoration: 'none',
    border: 'none',
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    maxWidth: '60px',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '150px',
  },
  option: {
    cursor: 'pointer',
    padding: theme.spacing(1),
    color: '#fff',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  registerOption: {
    cursor: 'pointer',
    border: '1.5px solid #fff',
    padding: theme.spacing(0.5),
    borderRadius: '5px',
    color: '#fff',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  disabled: {
    pointerEvents: 'none',
  },
}));

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolBar}>
          {/* TODO remove className logic after adding landing page */}
          <Link to="/">
            <img
              src={logo}
              className={classes.logo}
              alt="Expense Tracker Logo"
            />
          </Link>
          <div className={classes.options}>
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <span className={classes.option}>Login</span>
                </Link>
                <Link to="/register">
                  <span className={classes.registerOption}>SignUp</span>
                </Link>
              </>
            ) : (
              <span onClick={logout} className={classes.option}>
                Logout
              </span>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
