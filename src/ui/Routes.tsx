import React, { useEffect, useRef } from 'react';

import { Route, Switch, useHistory } from 'react-router-dom';

import { initialize } from '../bll/reducers';
import { selectAppStatus } from '../bll/selectors';
import { AppStatus } from '../common/constants';
import { useAppDispatch, useAppSelector } from '../common/hooks';

import { Preloader } from './components/elements/preloader/Preloader';
import { AdminContainer } from './pages/admin/AdminContainer';
import { LoginContainer } from './pages/auth/login/LoginContainer';
import { SignupContainer } from './pages/auth/signup/SignupContainer';
import { VerificationContainer } from './pages/auth/verification/VerificationContainer';
import { MainContainer } from './pages/main/MainContainer';
import { PublicMLContainer } from './pages/public/PublicMLContainer';

export const Routes = (props: any) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectAppStatus);
  const loadingStatus = status === AppStatus.USERDATA_LOADING || status === AppStatus.AUTH_LOADING;

  const { isInitialized, isMultilinkMode } = useAppSelector(state => state.app);

  const history = useHistory();

  const firstEnterUrl = useRef(history.location.pathname);

  useEffect(() => {
    dispatch(initialize(firstEnterUrl.current));
  }, [dispatch, firstEnterUrl]);

  if (!isInitialized) {
    return <Preloader />;
  }

  if (isMultilinkMode && isInitialized) {
    return <PublicMLContainer />;
  }

  return (
    <>
      {loadingStatus && (
        <div className="loader">
          <Preloader />
        </div>
      )}
      <Switch>
        <Route path="/login" render={() => <LoginContainer />} />
        <Route path="/signup" render={() => <SignupContainer />} />
        <Route path="/verification" render={() => <VerificationContainer />} />
        <Route path="/callback" render={() => <div>OAuth in progress...</div>} />
        {/* <Route path="/recovery" render={() => <PassRecoveryContainer />} />
    <Route path="/new-password" render={() => <NewPassContainer />} /> */}
        <Route path="/admin" render={() => <AdminContainer />} />
        <Route path="/" render={() => <MainContainer />} />
      </Switch>
    </>
  );
};
