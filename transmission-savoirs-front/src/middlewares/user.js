import axios from 'axios';
import { GET_USERS, setSelectedUserPost, setSelectedUser } from '../actions';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const selectUser = (store) => (next) => (action) => {
  if (action.type === GET_USERS) {
    instance(`/api/user/${action.id}`)
      .then((response) => {
        store.dispatch(setSelectedUser(response.data.user));
        store.dispatch(setSelectedUserPost(response.data.adsOfUser));
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  }
  next(action);
};

export default selectUser;
