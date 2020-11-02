import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from '@material-ui/core';

const Footer = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://r-0o0-j.tistory.com/">
        #006888 YERIEL
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;
