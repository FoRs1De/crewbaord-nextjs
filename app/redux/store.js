import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { updateTriggerReducer } from './reducers/updateTriggerReducer';

const store = configureStore({
  reducer: {
    authReducer,
    updateTriggerReducer,
  },
});

export default store;
