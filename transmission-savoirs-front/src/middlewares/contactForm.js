import axios from 'axios';
import { SEND_MESSAGE, sentMsg, setError } from '../actions';

// TODO mettre l'url de l'api
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const contactForm = (store) => (next) => (action) => {
  if (action.type === SEND_MESSAGE) {
    const { user: { fullname, email, message } } = store.getState();
    instance.post('/api/contact', { fullname, email, message })
      .then((response) => {
        store.dispatch(sentMsg(response.data.status));
      })
      .catch(() => {
        store.dispatch(setError('Le message n\'a pas pu être envoyé. Merci de réessayer plus tard.'));
      });
  }
  next(action);
};

export default contactForm;
