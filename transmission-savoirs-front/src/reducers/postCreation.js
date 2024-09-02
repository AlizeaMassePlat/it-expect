import { CHANGE_VALUE_POST, RESET_NEW_POST, SET_NEW_POST } from '../actions';

const initialState = {
  id: null,
  title: '',
  type: null,
  category: null,
  place: null,
  postal_code: null,
  description: '',
  newpost: {},
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_VALUE_POST:
      return {
        ...state,
        error: false,
        [action.key]: action.value,
      };
    case SET_NEW_POST:
      return {
        ...state,
        newpost: {
          ...action.data,
        },
      };
    case RESET_NEW_POST:
      return {
        ...state,
        newpost: {},
      };
    default:
      return state;
  }
}

export default reducer;
