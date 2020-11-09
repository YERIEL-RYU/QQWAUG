import React from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { AppBar, Avatar, makeStyles, Toolbar, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from './Menu';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transitions: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    cursor: 'pointer',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));
//로그인 후 회원의 정보에 사진이 있으면 avatar에 사진을 넣고 없으면 그대로
const Header = ({
  drawerState,
  onDrawerOpen,
  anchorEl,
  onMenuOpen,
  onMenuClose,
  onLogout,
}) => {
  const classes = useStyles();
  //My page click event
  const onClick = (e) => {
    onMenuOpen(e.currentTarget);
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, { [classes.appBarShift]: drawerState })}
    >
      <Toolbar>
        <IconButton
          aria-label="open menu"
          onClick={onDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, { [classes.hide]: drawerState })}
        >
          <MenuIcon />
        </IconButton>
        <Grid container>
          <Grid item xs>
            <Typography variant="h4" className={classes.title}>
              삥삥아 어디까지 갈래?
            </Typography>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Avatar className={classes.small} onClick={onClick}></Avatar>
                <Menu anchorEl={anchorEl} onMenuClose={onMenuClose} />
              </Grid>
              <Grid item>
                <Button color="inherit" onClick={onLogout}>
                  로그아웃
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
