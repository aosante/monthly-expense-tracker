import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth/AuthState';
import css from './Auth.module.scss';
import logo from '../../img/form-logo.png';

const Register = () => {
  const [submitting] = useState(false);
  const { registerUser, isAuthenticated } = useContext(AuthContext);
  const { register, errors, handleSubmit, reset } = useForm();

  if (isAuthenticated) {
    return <Redirect to="/tracker" />;
  }

  const onSubmit = async (data) => {
    await registerUser(data);
    reset();
  };
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
            <img src={logo} className={css.logo} alt="Form Logo" />
          </Box>
          <form
            method="POST"
            className={css.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              color="primary"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              inputRef={register({ required: true, maxLength: 20 })}
              autoFocus
              error={errors.name ? true : false}
              helperText={
                errors.name &&
                'Name is required and must be of less than 20 characters'
              }
            />
            <TextField
              color="primary"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              error={errors.email ? true : false}
              inputRef={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
              helperText={
                errors.email &&
                'Email is required and must have correct email address format'
              }
            />
            <TextField
              color="primary"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              error={errors.password ? true : false}
              inputRef={register({
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              })}
              helperText={
                errors.password &&
                'Password is required and must be of at least 8 characters'
              }
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
                {submitting ? 'Registering...' : 'Register'}
              </Button>
            </Box>
          </form>
          <Link to="/login" className={css.formLink}>
            Already have an account? Sign In
          </Link>
        </Paper>
      </div>
    </div>
  );
};

export default Register;
