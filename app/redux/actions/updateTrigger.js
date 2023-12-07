export const SET_UPDATE = 'SET_UPDATE';

export const setUpdateTrigger = (value) => {
  return {
    type: SET_UPDATE,
    payload: value,
  };
};
