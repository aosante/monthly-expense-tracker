import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import phone from '../../img/hero-phone.png';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '110vh',
    display: 'flex',
    '@media(max-width:750px)': {
      flexDirection: 'column',
    },
  },
  sections: {
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '2rem',
    '@media(max-width:750px)': {
      textAlign: 'center',
    },
  },
  img: {
    maxWidth: '600px',
    '@media(max-width:750px)': {
      maxWidth: '400px',
      maxHeight: '300px',
    },
  },
  button: {
    maxWidth: '200px',
    marginTop: '1rem',
    '@media(max-width:750px)': {
      margin: '1rem auto',
    },
  },
  link: {
    '&:hover': {
      transform: 'none',
    },
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.sections}>
        <Typography variant="h2" color="primary" gutterBottom>
          Keep Your Financial Life On Track
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Get rid of all worries by keeping track of your monthly expenses. Be
          sure to respect that monthly budget!
        </Typography>
        <Link to="/register" className={classes.link}>
          <Button
            mt={2}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Get Started
          </Button>
        </Link>
      </div>
      <div className={classes.sections}>
        <img src={phone} alt="phone" className={classes.img} />
      </div>
    </Container>
  );
};

export default Landing;
