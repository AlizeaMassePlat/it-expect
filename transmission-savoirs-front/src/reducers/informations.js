import { MSG_INIT, MSG_SENT } from '../actions';

const initialState = {
  msg: '',
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MSG_SENT:
      return {
        ...state,
        msg: action.msg,
      };
    case MSG_INIT:
      return {
        ...state,
        msg: '',
      };
    default:
      return state;
  }
}

export default reducer;
