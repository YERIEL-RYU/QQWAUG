import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  drawerOpen,
  drawerClose,
  menuOpen,
  menuClose,
  secMenuToggle,
  bookMarkToggle,
} from '../../store/reducers/layout';
import LayoutPresenter from './LayoutPresenter';
import Router from '../../routes/routes';
import { logoutRequest, userRequest } from '../../store/reducers/auth';

const LayoutContainer = () => {
  const {
    drawerState,
    anchorEl,
    secMenuOpen,
    secMenu,
    profileImg,
  } = useSelector((state) => ({
    drawerState: state.layout.drawerState,
    anchorEl: state.layout.anchorEl,
    secMenuOpen: state.layout.secMenuOpen,
    secMenu: state.layout.secMenu,
    profileImg: state.auth.profile.profileImg,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRequest());
  }, [dispatch]);
  //mainTemplate
  const onDrawerOpen = useCallback(() => dispatch(drawerOpen()), [dispatch]);
  const onDrawerClose = useCallback(() => dispatch(drawerClose()), [dispatch]);
  //Header
  const onMenuOpen = useCallback((anchorEl) => dispatch(menuOpen(anchorEl)), [
    dispatch,
  ]);
  const onMenuClose = useCallback(() => dispatch(menuClose()), [dispatch]);
  const onLogout = useCallback(() => dispatch(logoutRequest()), [dispatch]);
  //sidebar
  const onSecMenuToggle = useCallback(() => dispatch(secMenuToggle()), [
    dispatch,
  ]);
  const onBookMarkToggle = useCallback(
    (name) => dispatch(bookMarkToggle(name)),
    [dispatch],
  );
  return (
    <LayoutPresenter
      // maintemplate
      drawerState={drawerState}
      onDrawerOpen={onDrawerOpen}
      onDrawerClose={onDrawerClose}
      //header
      profileImg={profileImg}
      anchorEl={anchorEl}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      onLogout={onLogout}
      //sidebar
      secMenuOpen={secMenuOpen}
      secMenu={secMenu}
      onSecMenuToggle={onSecMenuToggle}
      onBookMarkToggle={onBookMarkToggle}
    >
      <Router />
    </LayoutPresenter>
  );
};

export default LayoutContainer;
