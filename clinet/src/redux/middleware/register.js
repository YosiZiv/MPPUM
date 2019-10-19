import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ALL_EMAILS_START,
  GET_ALL_EMAILS_SUCCESS,
  GET_ALL_EMAILS_FAIL,
  setUser,
  setEmails,
} from '../actions/register';
import { changeSellStage } from '../actions/sell';
import { apiRequest } from '../actions/api';
import { setMessage, redirectTo, clearUi, loadingFinish } from '../actions/ui';

export const registerStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'dashboard/register';
  if (action.type === REGISTER_START) {
    dispatch(
      apiRequest('POST', URL, action.payload, REGISTER_SUCCESS, REGISTER_FAIL),
    );
  }
};
export const registerSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === REGISTER_SUCCESS) {
    dispatch(setUser(action.payload.user));
    dispatch(changeSellStage('createProduct'));
    dispatch(redirectTo('/dashboard/sell/createitem'));
    dispatch(clearUi());
  }
};

export const registerFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === REGISTER_FAIL) {
    dispatch(setMessage(action.payload));
  }
};
export const getAllEmailsStart = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_ALL_EMAILS_START) {
    const URL = 'dashboard/getallemails';
    dispatch(
      apiRequest('GET', URL, null, GET_ALL_EMAILS_SUCCESS, GET_ALL_EMAILS_FAIL),
    );
  }
};
export const getAllEmailsSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_ALL_EMAILS_SUCCESS) {
    dispatch(setEmails(action.payload.emails));
  }
};
export const getAllEmailsFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_ALL_EMAILS_FAIL) {
    dispatch(setMessage(action.payload));
  }
};

export const registerhMdl = [
  registerStart,
  registerSuccess,
  registerFail,
  getAllEmailsStart,
  getAllEmailsSuccess,
  getAllEmailsFail,
];
