import React, { useCallback } from 'react';
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
import { logoutRequest } from '../../store/reducers/auth';

const LayoutContainer = () => {
  const { drawerState, anchorEl, secMenuOpen, secMenu } = useSelector(
    (state) => ({
      drawerState: state.layout.drawerState,
      anchorEl: state.layout.anchorEl,
      secMenuOpen: state.layout.secMenuOpen,
      secMenu: state.layout.secMenu,
    }),
  );
  const dispatch = useDispatch();
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
