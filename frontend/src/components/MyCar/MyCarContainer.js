import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestMyCar } from '../../store/reducers/mycar';

import MyCarPresenter from './MyCarPresenter';

const MyCarContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestMyCar(localStorage.getItem('userid')));
  }, []);
  return <MyCarPresenter />;
};

export default MyCarContainer;
