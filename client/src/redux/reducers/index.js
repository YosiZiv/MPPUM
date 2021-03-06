import { uiReducer } from './ui';
import { authReducer } from './auth';
import { registerReducer } from './register';
import { combineReducers } from 'redux';
import { sellReducer } from './sell';
import { fileReducer } from './file';
export const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  register: registerReducer,
  sell: sellReducer,
  file: fileReducer,
});
