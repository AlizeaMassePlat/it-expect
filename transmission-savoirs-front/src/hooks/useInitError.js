import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initError } from '../actions';

/**
 * Initialize error state on first render
 */
function useInitError() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initError());
  }, []);
}

export default useInitError;
