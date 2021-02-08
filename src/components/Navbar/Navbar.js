import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import AlanLogo from '../../assests/alan-logo.jpg';
import useStyles from './navbarStyles';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography variant='h6' className={classes.title} color='inherit'>
            <img
              src={AlanLogo}
              alt='-'
              height='25px'
              className={classes.image}
            />
            News App ft. Alan AI
          </Typography>
          <div className={classes.grow}></div>
          <div>
            <a
              href='https://musicianstuff.site'
              rel='noreferrer'
              target='_blank'
              className={classes.mattSetyadi}
            >
              &copy; MattSetyadi
            </a>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
