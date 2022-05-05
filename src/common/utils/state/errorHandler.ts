import { Dispatch } from 'redux';

import { setAppStatus, setError, TAppActions } from '../../../bll/reducers/app';
import { AppStatus } from '../../constants';

const ERROR_RESET_TIMEOUT = 3000;

export const handleServerNetworkError = (
  e: any,
  status: AppStatus,
  dispatch: ErrorUtilsDispatchType,
) => {
  const error = e.response ? e.response.data.error : e.message;
  dispatch(setError(error));
  dispatch(setAppStatus(status));
  console.log('Error: ', e.message);
  if (status === AppStatus.AUTH_FAILED || status === AppStatus.USERDATA_FAILED) {
    setTimeout(() => {
      dispatch(setAppStatus(AppStatus.IDLE));
    }, ERROR_RESET_TIMEOUT);
  }
};

type ErrorUtilsDispatchType = Dispatch<TAppActions>;
