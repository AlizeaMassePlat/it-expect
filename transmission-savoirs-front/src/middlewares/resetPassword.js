/* eslint-disable quote-props */
import axios from 'axios';
import {
  displayElement,
  msgSent, RESET_PASSWORD, setError, SUBMIT_NEW_PASSWORD, toggleLoading,
} from '../actions';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const resetPassword = (store) => (next) => (action) => {
  if (action.type === RESET_PASSWORD) {
    store.dispatch(toggleLoading());
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { user: { email } } = store.getState();
      console.log('email in middleware', email);
      instance.post('/api/resetpassword', { email }, config)
        .then((response) => {
          console.log('response', response);
          store.dispatch(msgSent(response.data.message));
          store.dispatch(toggleLoading());
        })
        .catch((error) => {
          console.log('error', error);
          store.dispatch(setError(error.response.data.message));
        });
    }
    catch (error) {
      // console.error(error);
      store.dispatch(setError(error.message));
    }
  }
  else if (action.type === SUBMIT_NEW_PASSWORD) {
    try {
      store.dispatch(toggleLoading());
      const { user: { password } } = store.getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${action.token}`,
        },
      };
      instance.patch('/api/newpassword', { password }, config)
        .then((response) => {
          store.dispatch(msgSent(response.data.message));
          store.dispatch(displayElement());
          store.dispatch(toggleLoading());
        })
        .catch((error) => {
          store.dispatch(setError(error.message));
        });
    }
    catch (error) {
      store.dispatch(setError(error.message));
    }
  }
  next(action);
};

export default resetPassword;
