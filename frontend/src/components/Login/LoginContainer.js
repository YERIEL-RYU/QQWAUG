import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../store/reducers/auth';

import LoginPresenter from './LoginPresenter';

const LoginContainer = () => {
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();
  const onInputChange = useCallback(
    (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value],
  );
  const onLogin = useCallback(
    () => dispatch(loginRequest(value.username, value.password)),
    [dispatch, value],
  );

  return (
    <LoginPresenter
      onInputChange={onInputChange}
      value={value}
      onLogin={onLogin}
    />
  );
};

export default LoginContainer;
