import React, { useCallback, useState } from 'react';

import LoginPresenter from './LoginPresenter';

const LoginContainer = ({ userLogin }) => {
  const [value, setValue] = useState([]);
  const onInputChange = useCallback(
    (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value],
  );
  const onLogin = () => {
    console.log(value);
    fetch('http://localhost:8000/auth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    })
      .then((data) => data.json())
      .then((data) => {
        userLogin(data.token);
      })
      .catch((error) => console.error(error));
  };
  return (
    <LoginPresenter
      onInputChange={onInputChange}
      value={value}
      onLogin={onLogin}
    />
  );
};

export default LoginContainer;
