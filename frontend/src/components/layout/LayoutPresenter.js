import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    fontFamily: 'Sans',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
}));

const LayoutPresenter = ({
  children,
  //maintemplate
  drawerState,
  onDrawerOpen,
  onDrawerClose,
  //header
  anchorEl,
  onMenuOpen,
  onMenuClose,
  onLogout,
  //sidebar
  secMenu,
  secMenuOpen,
  onSecMenuToggle,
  onBookMarkToggle,
}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Header
          onDrawerOpen={onDrawerOpen}
          drawerState={drawerState}
          anchorEl={anchorEl}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          onLogout={onLogout}
        />
        <Sidebar
          drawerState={drawerState}
          onDrawerClose={onDrawerClose}
          secMenu={secMenu}
          secMenuOpen={secMenuOpen}
          onSecMenuToggle={onSecMenuToggle}
          onBookMarkToggle={onBookMarkToggle}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default LayoutPresenter;
