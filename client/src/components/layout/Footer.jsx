import React from 'react';
import { Typography } from '@material-ui/core';
import css from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <Typography component="p" color="primary">
        By Andrés Osante
      </Typography>
    </footer>
  );
};

export default Footer;
