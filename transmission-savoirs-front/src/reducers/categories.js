import { SET_CATEGORIES } from '../actions';

export const initialState = {
  list: [],
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        list: action.categories,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
