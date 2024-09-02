/* eslint-disable quote-props */
/* eslint-disable camelcase */
import axios from 'axios';
import {
  DELETE_POST,
  DELETE_USER,
  GET_AVATARS,
  initUser,
  LOGIN,
  msgSent,
  NEW_POST,
  setAvatars,
  setError,
  setNewPost,
  setUser,
  SIGNUP,
  SUBMIT_NEW_EMAIL,
  toggleDeleted,
  toggleLoading,
  togglePostDeleted,
  toggleSavedData,
  UPDATE_AVATAR,
  UPDATE_PERSONAL_INFO,
  UPDATE_PROFILE,
} from '../actions';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getUserData = (user) => ({
  admin: user.admin,
  userId: user.userId,
  avatarId: user.avatarId,
  birthdate: user.birthdate,
  created_at: user.created_at,
  description: user.description,
  email: user.email,
  firstname: user.firstname,
  lastname: user.lastname,
  logged: user.logged,
  postalCode: user.postalCode,
  pronoun: user.pronoun,
  roleId: user.roleId,
  userProfil: user.userProfil,
  username: user.username,
});

const ajax = (store) => (next) => (action) => {
  const { user: { token: tokenState } } = store.getState();
  const tokenConfig = {
    headers: { Authorization: `Bearer ${tokenState}` },
  };

  if (action.type === LOGIN) {
    store.dispatch(toggleLoading());
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { user: { email, password } } = store.getState();
      instance.post('/api/login', { email, password }, config).then((response) => {
        const token = response.data.tokens.accessToken;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token-date', Math.floor(new Date().getTime() / 1000));
        const data = { user: response.data.user, token };
        store.dispatch(setUser(data));
      }).catch((error) => {
        if (error.status === 401) {
          store.dispatch(setError('Email ou mot de  passe incorrect.'));
        }
        else {
          store.dispatch(setError('Email ou mot de  passe incorrect.'));
        }
      });
    }
    catch (error) {
      store.dispatch(setError(error.message));
    }
  }
  else if (action.type === SIGNUP) {
    store.dispatch(toggleLoading());
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const date = new Date().toISOString().split('T')[0];
      const {
        user: {
          email, password, username: pseudo, birthdate,
        },
      } = store.getState();
      instance.post('/api/register', {
        email, password, pseudo, birthdate,
      }, config).then((response) => {
        const token = response.data.newTokens.accessToken;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          email, password, pseudo, birthdate, created_at: date, id: response.data.newUser.id,
        }));
        store.dispatch(setUser({
          user: {
            email, pseudo, birthdate, created_at: date, id: response.data.newUser.id,
          },
          token,
        }));
        store.dispatch(toggleLoading());
      }).catch((error) => {
        if (error.response.data.constraint === 'user_email_key') {
          store.dispatch(setError('Cette adresse email est déjà utilisée.'));
        }
        else if (error.response.data.constraint === 'user_pseudo_key') {
          store.dispatch(setError('Ce nom d\'utilsateur est déjà utilisé.'));
        }
        else {
          store.dispatch(setError('Inscription impossible merci de réessayer plus tard.'));
        }
      });
    }
    catch (error) {
      store.dispatch(setError(error.message));
    }
  }
  else if (action.type === UPDATE_PROFILE) {
    try {
      const { user } = store.getState();
      const { userId, username: pseudo, description } = user;
      const userData = getUserData(user);
      instance.patch(`/api/user/${userId}`, { pseudo, description }, tokenConfig)
        .then(() => {
          localStorage.setItem('user', JSON.stringify(userData));
          store.dispatch(toggleSavedData());
        })
        .catch((error) => {
          if (error.response.status === 401) {
            return store.dispatch(setError('Vous n\'êtes pas autorisé à faire cette modification'));
          }
          return store.dispatch(setError(error.message));
        });
    }
    catch (error) {
      store.dispatch(setError(error.message));
    }
  }
  else if (action.type === UPDATE_PERSONAL_INFO) {
    try {
      const { user } = store.getState();
      const {
        userId, lastname, firstname, birthdate, postalCode, pronoun,
      } = user;
      const userData = getUserData(user);

      instance.patch(`/api/user/${userId}`, {
        lastname, firstname, birthdate, postal_code: postalCode, pronoun,
      }, tokenConfig)
        .then(() => {
          // console.log(response.data);
          localStorage.setItem('user', JSON.stringify(userData));
          store.dispatch(toggleSavedData());
        })
        .catch((error) => {
          if (error.response.status === 401) {
            return store.dispatch(setError('Vous n\'êtes pas autorisé à faire cette modification'));
          }
          return store.dispatch(setError(error.message));
        });
    }
    catch (error) {
      store.dispatch(setError(error.message));
    }
  }
  else if (action.type === GET_AVATARS) {
    try {
      instance('/api/avatar')
        .then((response) => store.dispatch(setAvatars(response.data)))
        .catch((error) => store.dispatch(setError(error.message)));
    }
    catch (error) {
      store.dispatch(setError(error.message));
    }
  }
  else if (action.type === UPDATE_AVATAR) {
    const { user } = store.getState();
    const { userId, avatarId: picture_id } = user;
    const userData = getUserData(user);

    instance.patch(`/api/user/${userId}`, { picture_id }, tokenConfig)
      .then(() => {
        localStorage.setItem('user', JSON.stringify(userData));
        // const data = { user: response.data.user, token: localStorage.getItem('token') };
        // store.dispatch(setUser(data));
        store.dispatch(toggleSavedData());
      })
      .catch((error) => {
        if (error.response.status === 401) {
          store.dispatch(setError('Vous n\'êtes pas autorisé à faire cette modification'));
        }
        else {
          store.dispatch(setError(error.message));
        }
      });
  }
  else if (action.type === DELETE_USER) {
    const { user: { userId } } = store.getState();
    instance.delete(`/api/user/${userId}`, tokenConfig)
      .then(() => {
        store.dispatch(toggleDeleted());
        store.dispatch(initUser());
        localStorage.clear();
      })
      .catch((error) => {
        store.dispatch(setError(error.response.data.status));
      });
  }
  else if (action.type === SUBMIT_NEW_EMAIL) {
    try {
      const { user } = store.getState();
      const { userId, email } = user;
      const userData = getUserData(user);
      instance.patch(`/api/user/${userId}`, { email }, tokenConfig)
        .then(() => {
          localStorage.setItem('user', JSON.stringify(userData));
          store.dispatch(toggleSavedData());
        })
        .catch((error) => {
          if (error.response.status === 401) {
            return store.dispatch(setError('Vous n\'êtes pas autorisé à faire cette modification'));
          }
          if (error.response.status === 404) {
            return store.dispatch(setError('Cette adresse email est déjà utilisée.'));
          }
          return store.dispatch(setError(error.message));
        });
    }
    catch (error) {
      store.dispatch(setError(error.message));
    }
  }
  else if (action.type === NEW_POST) {
    const {
      postCreation: {
        title,
        category: image,
        description,
        condition: condition_id,
        type: type_id,
        category: category_id,
        postal_code,
      },
    } = store.getState();
    const { user: { token, userId: user_id } } = store.getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    instance.post('/api/users/create-annonces', {
      title, image, description, condition_id, type_id, category_id, user_id, postal_code,
    }, config)
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(setNewPost(response.data));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return store.dispatch(msgSent('Vous n\'êtes pas autorisé à faire cette modification'));
        }
        return store.dispatch(msgSent(error.message));
      });
  }
  else if (action.type === DELETE_POST) {
    instance.delete(`/api/annonces/${action.id}`, tokenConfig)
      .then(() => {
        store.dispatch(togglePostDeleted());
      })
      .catch(() => {
        // console.log(error);
        store.dispatch(setError('L\'annonce n\'a pas pu être supprimée.'));
      });
  }
  next(action);
};

export default ajax;
