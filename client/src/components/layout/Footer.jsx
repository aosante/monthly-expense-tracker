import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'rgb(52, 57, 61)',
    minHeight: '110px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography component="p" color="primary">
        By Andrés Osante
      </Typography>
    </footer>
  );
};

export default Footer;
