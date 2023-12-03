import { SET_AUTH } from '../actions/auth';

export const initialState = null;

export const authReducer = (state = initialState, action) => {
  if (action.type === SET_AUTH) {
    return action.payload;
  }
  return state;
};
