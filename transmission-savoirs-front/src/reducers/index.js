import { combineReducers } from 'redux';

import postsReducer from './posts';
import userReducer from './user';
import categoriesReducer from './categories';
import searchReducer from './search';
import informationsReducer from './informations';
import postCreationReducer from './postCreation';

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
  categories: categoriesReducer,
  search: searchReducer,
  informations: informationsReducer,
  postCreation: postCreationReducer,
});

export default rootReducer;
