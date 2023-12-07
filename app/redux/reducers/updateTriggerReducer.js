import { SET_UPDATE } from '../actions/updateTrigger';

export const initialState = false;

export const updateTriggerReducer = (state = initialState, action) => {
  if (action.type === SET_UPDATE) {
    return action.payload;
  }
  return state;
};
