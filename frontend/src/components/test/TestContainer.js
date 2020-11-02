import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post } from '../../store/reducers/test';

import TestPresenter from './TestPresenter';

const TestContainer = () => {
  const list = useSelector((state) => state.test.list);

  const dispatch = useDispatch();

  const [DialogOpen, setOnDialogOpen] = useState(false);
  const [value, setValue] = useState([]);

  //dialog 열림
  const onDialogOpen = () => {
    setOnDialogOpen(true);
    console.log('엔진오일 교체 내역 추가');
  };
  //dialog 닫힘
  const onDialogClose = () => {
    setOnDialogOpen(false);
    console.log('Dialog 닫음');
  };

  //input value change
  const onChange = useCallback(
    (e) => {
      console.log(e.target.value, e.target.name);
      setValue({ ...value, [e.target.name]: e.target.value });
      console.log(value);
    },
    [value],
  );

  //input submit
  const onClick = useCallback(() => {
    setValue('');
    setOnDialogOpen(false);
  }, [value]);
  return (
    <TestPresenter
      list={list}
      DialogOpen={DialogOpen}
      value={value}
      onDialogOpen={onDialogOpen}
      onDialogClose={onDialogClose}
      onChange={onChange}
    />
  );
};

export default TestContainer;
