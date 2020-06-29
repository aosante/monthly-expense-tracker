import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'rgb(52, 57, 61)',
    minHeight: '110px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2em',
    '@media(max-width:600px)': {
      flexDirection: 'column',
      padding: '0.5em 2em',
    },
  },
  icons: {
    padding: '1em',
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '150px',
  },
  icon: {
    fontSize: '2.35em',
    padding: '5px',
    backgroundColor: 'rgb(34, 35, 36)',
    borderRadius: '50px',
    color: 'rgba(255, 255, 255,0.7)',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.1)',
    },
  },
  name: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  cr: {
    color: '#07b1a8',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <div className={classes.icons}>
        <GitHubIcon className={classes.icon} />
        <LinkedInIcon className={classes.icon} />
      </div>
      <div>
        <Typography component="p" className={classes.name}>
          Andrés Osante <span className={classes.cr}>&copy; 2020</span>
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
