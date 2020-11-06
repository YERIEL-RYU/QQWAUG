import { combineReducers } from 'redux';
import layout from './layout';
import auth from './auth';

const rootReducer = combineReducers({
  layout,
  auth,
});

export default rootReducer;
