import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import css from './Navbar.module.scss';

const Navbar = () => {
  useEffect(() => {
    console.log('call loadUser from authcontext');
  }, []);

  return (
    <div className={css.root}>
      <AppBar position="static" color="primary">
        <Toolbar className={css.toolBar}>
          <Link to="/">
            <Typography variant="h6" className={css.title}>
              Expense Keeper
            </Typography>
          </Link>
          <div className={css.options}>
            {/* options need to be conditinal based on user auth */}
            <Link to="/">
              <span className={css.option}>Login</span>
            </Link>
            <Link to="/tracker">
              <span className={css.option}>Tracker</span>
            </Link>
            <Link to="/register">
              <span className={css.registerOption}>SignUp</span>
            </Link>
            {/* <span className={css.option}>Logout</span> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
