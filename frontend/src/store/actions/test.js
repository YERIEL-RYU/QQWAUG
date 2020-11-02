import axios from 'axios';

import * as actionTypes from './actionTypes';

//Global API
const api = axios.create({
  baseURL: `${process.env.DJANGO_URI}`,
});

//test 시작
export const readPost = () => ({ type: actionTypes.READ_POST });
export const readPostSuccess = (data) => ({
  type: actionTypes.READ_POST_SUCCESS,
  data,
});
export const readPostFailure = () => ({
  type: actionTypes.READ_POST_FAILURE,
});

export const readPostRequest = () => {
  return async (dispatch) => {
    dispach(readPost());

    await api
      .get('/post/list/')
      .then((response) => response)
      .then(({ data, status }) => {
        switch (status) {
          case 200:
            dispatch(readPostSuccess(data));
            break;
          default:
            break;
        }
      })
      .catch(dispatch(readPostFailure()));
  };
};
