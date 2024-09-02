import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initUser } from '../actions';

/**
 * Initialize user state on first render
 */
function useInitUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, []);
}

export default useInitUser;
