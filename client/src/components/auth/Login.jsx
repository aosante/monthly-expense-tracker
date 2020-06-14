import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/auth/AuthState';
import {
  Button,
  Box,
  CircularProgress,
  TextField,
  Paper,
} from '@material-ui/core';
import css from './Auth.module.scss';
import logo from '../../img/form-logo.png';

const Login = () => {
  const [submitting] = useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);
  const { register, errors, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await login(data);
    reset();
  };

  if (isAuthenticated) return <Redirect to="/tracker" />;

  return (
    <div className={css.container}>
      <div className={css.layout}>
        <Paper className={css.paper} elevation={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <img src={logo} alt="Form Logo" className={css.logo} />
          </Box>
          <form
            mehotd="POST"
            className={css.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              color="primary"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={errors.email ? true : false}
              inputRef={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
              helperText={errors.email && 'Please provide a valid email'}
            />
            <TextField
              color="primary"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              autoComplete="password"
              type="password"
              error={errors.password ? true : false}
              inputRef={register({
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              })}
              helperText={errors.password && 'Please provide a valid password'}
            />
            <Box mb={6}>
              <Button
                disabled={submitting}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={css.submit}
              >
                {submitting && (
                  <CircularProgress size={24} className={css.buttonProgress} />
                )}
                {submitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>
          </form>
          <Link to="/register" className={css.formLink}>
            Don't have an account? Sign Up
          </Link>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
