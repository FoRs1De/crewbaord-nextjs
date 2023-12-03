export const SET_AUTH = 'SET_AUTH';

export const setAuth = (value) => {
  return {
    type: SET_AUTH,
    payload: value,
  };
};
