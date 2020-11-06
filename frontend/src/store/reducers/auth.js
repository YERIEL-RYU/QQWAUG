import axios from 'axios';

//type 정의
const LOGIN = '/auth/LOGIN';
const LOGIN_SUCCESS = '/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = '/auth/LOGIN_FAILURE';

const REGISTER = '/auth/REGISTER';
const REGISTER_SUCCESS = '/auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = '/auth/REGISTER_FAILURE';

const instnace = axios.create({
  baseURI: 'http://localhost:8000',
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
export const loginRequest = (username, password) => {
  console.log(username, password, 'store reducers auth.js');
  return (disapth) => {
    disapth(login());
    axios
      .post('http://localhost:8000/auth/token/', {
        username,
        password,
      })
      .then((response) => response.data)
      .then(({ token, refresh, author, username }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('author', author);
        localStorage.setItem('username', username);
        disapth(loginSuccess(token, refresh));
      })
      .catch((error) => {
        if (error.response) {
          const { status } = error.response;
          switch (status) {
            case 400:
              disapth(loginFailure(error));
              break;

            case 404:
              disapth(loginFailure());
              break;

            case 500:
              disapth(loginFailure());
              break;

            default:
              disapth(loginFailure());
              break;
          }
        } else {
          disapth(loginFailure());
        }
      });
  };
};

//초기 상태
const initialState = {
  status: {
    isLoggedIn: localStorage.getItem('access') ? true : false,
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
        access: action.access,
        refresh: action.refresh,
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
    default:
      return state;
  }
};
export default auth;
