import axios from 'axios';
import {
  LAUNCH_SEARCH,
  GET_CATEGORIES,
  dbError,
  setCategories,
  setResults,
  toggleLoading,
  noResult,
} from '../actions';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const search = (store) => (next) => (action) => {
  if (action.type === GET_CATEGORIES) {
    instance.get('/api/categories')
      .then((response) => {
        store.dispatch(setCategories(response.data));
        store.dispatch(toggleLoading());
      })
      .catch(() => {
      // en cas d’échec de la requête
        // console.log(error);
        store.dispatch(dbError('Erreur serveur, merci de réessayer plus tard.'));
      });
  }

  if (action.type === LAUNCH_SEARCH) {
    instance.get(`/api/annonces/category/${action.category}/type/${action.learnOrShare}`)
      .then((response) => {
        store.dispatch(setResults(response.data));
      })
      .catch((error) => {
      // en cas d’échec de la requête
        // console.log(error);
        if (error.response.status === 502) {
          store.dispatch(dbError('Erreur serveur, merci de réessayer dans quelques minutes.'));
        }
        else if (error.response.status === 404) {
          store.dispatch(noResult());
        }
        else {
          store.dispatch(dbError('Erreur serveur, merci de réessayer plus tard.'));
        }
      });
  }
  next(action);
};

export default search;
