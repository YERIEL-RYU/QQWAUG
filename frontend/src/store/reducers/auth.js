import axios from 'axios';

//type 정의
const LOGIN = '/auth/LOGIN';
const LOGIN_SUCCESS = '/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = '/auth/LOGIN_FAILURE';
const LOGOUT = 'auth/LOGOUT';

const REGISTER = '/auth/REGISTER';
const REGISTER_SUCCESS = '/auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = '/auth/REGISTER_FAILURE';

const api = axios.create({
  baseURI: 'http://localhost:8000/',
});

//action 함수
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
export const logout = () => ({
  type: LOGOUT,
  isLoggedIn: false,
});
export const loginRequest = (userid, password) => {
  return (dispatch) => {
    dispatch(login());
    api
      .post('http://localhost:8000/users/login/', {
        userid,
        password,
      })
      .then((response) => response.data)
      .then(({ token, refresh, author, userid }) => {
        localStorage.setItem('token', token);
        // localStorage.setItem('refresh', refresh);
        // localStorage.setItem('author', author);
        localStorage.setItem('userid', userid);
        dispatch(loginSuccess(token));
      })
      .catch((error) => {
        if (error.response) {
          const { status } = error.response;
          switch (status) {
            case 400:
              dispatch(loginFailure(error));
              break;

            case 404:
              dispatch(loginFailure());
              break;

            case 500:
              dispatch(loginFailure());
              break;

            default:
              dispatch(loginFailure());
              break;
          }
        } else {
          dispatch(loginFailure());
        }
      });
  };
};
export const logoutRequest = () => {
  return (dispatch) => {
    dispatch(logout());
    window.localStorage.clear();
  };
};

//초기 상태
const initialState = {
  status: {
    isLoggedIn: localStorage.getItem('token') ? true : false,
  },
  token: null,
  refresh: null,
  loading: false,
};

//리듀서 함수
const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        status: {
          isLoggedIn: true,
        },
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        refresh: null,
        status: {
          isLoggedIn: action.isLoggedIn,
        },
      };
    default:
      return state;
  }
};
export default auth;
