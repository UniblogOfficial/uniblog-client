import { Dispatch } from 'redux';

import { setAppStatus, setError, TAppActions } from '../../../bll/reducers/app';

const ERROR_RESET_TIMEOUT = 3000;

export const handleServerNetworkError = (
  e: any,
  type: 'auth' | 'content' | 'user data',
  dispatch: ErrorUtilsDispatchType,
) => {
  const error = e.response ? e.response.data.error : e.message;
  dispatch(setError(error));
  dispatch(setAppStatus(`${type} failed`));
  console.log('Error: ', e.message);
  if (type === ('auth' || 'user data')) {
    setTimeout(() => {
      dispatch(setAppStatus('idle'));
    }, ERROR_RESET_TIMEOUT);
  }
};

type ErrorUtilsDispatchType = Dispatch<TAppActions>;
