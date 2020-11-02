import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

//material
import {
  Collapse,
  makeStyles,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Typography,
  IconButton,
  Grid,
} from '@material-ui/core';
//material icon
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import {
  DirectionsCar,
  ExpandLess,
  ExpandMore,
  StarBorder,
  Star,
  Add,
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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
  button: {
    cursor: 'pointer',
  },
}));

const Sidebar = (props) => {
  const {
    drawerState,
    onDrawerClose,
    secMenu,
    secMenuOpen,
    onSecMenuToggle,
    onBookMarkToggle,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const onSecMenuOpen = useCallback(() => {
    onSecMenuToggle();
  }, [onSecMenuToggle]);
  const onPlus = () => {
    console.log('항목추가');
  };
  const onBookMark = useCallback(
    (menu) => {
      onBookMarkToggle(menu.menu);
    },
    [onBookMarkToggle],
  );
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerState,
        [classes.drawerClose]: !drawerState,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerState,
          [classes.drawerClose]: !drawerState,
        }),
      }}
    >
      <Grid className={classes.toolbar}>
        <Link to="/index" style={{ textDecoration: 'none' }}>
          <Typography variant="subtitle1">삥삥아 어디까지 갈래</Typography>
        </Link>
        <IconButton onClick={onDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Grid>
      <Divider />
      <List>
        <Link to="/mycar">
          <ListItem>
            <ListItemIcon>
              <AirportShuttleIcon />
            </ListItemIcon>
            <ListItemText>차량 등록</ListItemText>
          </ListItem>
        </Link>
        <Link to="/oil">
          <ListItem>
            <ListItemIcon>
              <LocalGasStationIcon />
            </ListItemIcon>
            <ListItemText>주유 관리</ListItemText>
          </ListItem>
        </Link>
        <ListItem className={classes.button} onClick={onSecMenuOpen}>
          <ListItemIcon>
            <AirportShuttleIcon />
          </ListItemIcon>
          <ListItemText>차량 정비</ListItemText>
          {secMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={secMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {secMenu.map((menu) => (
              <Link to={menu.link} key={menu.name}>
                <ListItem>
                  <ListItemIcon>
                    <DirectionsCar />
                  </ListItemIcon>
                  <ListItemText>{menu.name}</ListItemText>
                  <ListItemIcon
                    checked={menu.bookMark}
                    onClick={() => onBookMark({ menu })}
                  >
                    {menu.bookMark ? <Star /> : <StarBorder />}
                  </ListItemIcon>
                </ListItem>
              </Link>
            ))}
            <ListItem alignItems="center" onClick={onPlus}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText className={classes.button}>항목 추가</ListItemText>
            </ListItem>
          </List>
        </Collapse>
        <ListItem>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText>즐겨찾기</ListItemText>
        </ListItem>
        <List>
          {secMenu.map(
            (menu) =>
              menu.bookMark === true && (
                <Link to={menu.link} key={menu.name}>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar />
                    </ListItemIcon>
                    <ListItemText>{menu.name}</ListItemText>
                  </ListItem>
                </Link>
              ),
          )}
        </List>
      </List>
    </Drawer>
  );
};

export default Sidebar;
