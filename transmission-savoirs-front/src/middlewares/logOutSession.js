const logOutSession = () => (next) => (action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
  }
  next(action);
};

export default logOutSession;
