import axios from 'axios';

const LOGIN = '/auth/LOGIN';
const LOGIN_SUCCESS = '/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = '/auth/LOGIN_FAILURE';

const REGISTER = '/auth/REGISTER';
const REGISTER_SUCCESS = '/auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = '/auth/REGISTER_FAILURE';

const api = axios.create({
  baseURI: `${process.env.DJANGO_URI}`,
});

export const login = () => ({
  type: LOGIN,
});
export const loginSuccess = (access, refresh) => ({
  type: LOGIN_SUCCESS,
  access,
  refresh,
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});
export const loginRequest = (username, password) => {
  return (disapth) => {
    disapth(login());

    api
      .post('/auth/token', {
        username,
        password,
      })
      .then((response) => response.data)
      .then(({ access, refresh, author, username }) => {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('author', author);
        localStorage.setItem('username', username);
        disapth(loginSuccess(access, refresh));
      })
      .catch((error) => {});
  };
};
