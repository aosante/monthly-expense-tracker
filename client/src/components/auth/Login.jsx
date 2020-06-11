import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  CircularProgress,
  Typography,
  TextField,
  Paper,
} from '@material-ui/core';
import css from './Auth.module.scss';
// TODO, add confirm password functionality
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [submitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('loggin in', formData);
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
            <Typography component="h1" variant="h4" gutterBottom>
              Login
            </Typography>
          </Box>
          <form
            mehotd="POST"
            className={css.form}
            noValidate
            onSubmit={handleSubmit}
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
              defaultValue={formData.email}
              onChange={(e) => handleChange(e)}
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
              defaultValue={formData.email}
              onChange={(e) => handleChange(e)}
              type="password"
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
