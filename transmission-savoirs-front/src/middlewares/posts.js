import axios from 'axios';
import {
  GET_POSTS,
  setPosts,
  GET_SELECTED_POST,
  setSelectedPost,
  setSimilarPosts,
  togglePostError,
  GET_POSTS_BY_CATEGORY,
  GET_TYPE_POSTS,
  togglePostsLoading,
  setError,
} from '../actions';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const selectPost = (store) => (next) => (action) => {
  if (action.type === GET_POSTS) {
    instance.get('api/annonces')
      .then((response) => {
        store.dispatch(setPosts(response.data));
        // store.dispatch(toggleLoading());
      })
      .catch((error) => {
        // en cas d’échec de la requête
        console.log(error);
      });
  }

  else if (action.type === GET_SELECTED_POST) {
    const { posts: { isLoading } } = store.getState();
    if (!isLoading) store.dispatch(togglePostsLoading());
    instance(`/api/annonces/${action.id}`)
      .then((response) => {
        store.dispatch(setSelectedPost(response.data.post));
        store.dispatch(setSimilarPosts(response.data.similarPosts));
      })
      .catch(() => {
        // console.log(error);
        store.dispatch(togglePostError());
      });
    // store.dispatch(setSelectedPost(selectedPost));
  }

  else if (action.type === GET_POSTS_BY_CATEGORY) {
    instance(`/api/annonces/category/${action.id}`)
      .then((response) => {
        store.dispatch(setPosts(response.data));
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return store.dispatch(setError('Aucune annonce trouvée.'));
        }
        return store.dispatch(setError(error.message));
      });
  }

  else if (action.type === GET_TYPE_POSTS) {
    instance(`/api/annonces/type/${action.id}`)
      .then((response) => {
        store.dispatch(setPosts(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  next(action);
};

export default selectPost;
