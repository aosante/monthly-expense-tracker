import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { AuthContext } from '../../context/auth/AuthState';
import css from './Navbar.module.scss';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

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
            {!isAuthenticated ? (
              <>
                <Link to="/">
                  <span className={css.option}>Login</span>
                </Link>
                <Link to="/register">
                  <span className={css.registerOption}>SignUp</span>
                </Link>
              </>
            ) : (
              <span onClick={logout} className={css.option}>
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
