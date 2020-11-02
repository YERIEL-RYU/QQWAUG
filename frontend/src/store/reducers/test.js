import * as actionTypes from '../actions/actionTypes';

const intialState = {
  list: [],
  loading: false,
};

const postStart = (state, action) => {
  return { ...state, loading: true };
};

const postSuccess = (state, action) => {
  return {
    ...state,
    list: action.data.results,
    loading: false,
  };
};

const post = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.READ_POST:
      return postStart(state, action);
    case actionTypes.READ_POST_SUCCESS:
      return postSuccess(state, action);
    default:
      return state;
  }
};

export default post;
