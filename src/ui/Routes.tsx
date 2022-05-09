import React, { useEffect, useMemo, useRef } from 'react';

import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { initialize } from '../bll/reducers';
import { useAppDispatch, useAppSelector } from '../common/hooks';

import { NotFound } from './pages/404';
import { LoginContainer } from './pages/auth/login/LoginContainer';
import { SignupContainer } from './pages/auth/signup/SignupContainer';
import { VerificationContainer } from './pages/auth/verification/VerificationContainer';
import { MainContainer } from './pages/main/MainContainer';
import { PublicContainer } from './pages/public/PublicContainer';

export const Routes = (props: any) => {
  const dispatch = useAppDispatch();

  const { isInitialized, isMultilinkMode } = useAppSelector(state => state.app);

  const history = useHistory();

  const firstEnterUrl = useRef(history.location.pathname);

  useEffect(() => {
    dispatch(initialize(firstEnterUrl.current));
  }, [dispatch, firstEnterUrl]);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '50%', textAlign: 'center', width: '100%' }}>
        preloader
      </div>
    );
  }

  if (isMultilinkMode && isInitialized) {
    return <PublicContainer />;
  }

  return (
    <Switch>
      <Route path="/login" render={() => <LoginContainer />} />
      <Route path="/signup" render={() => <SignupContainer />} />
      <Route path="/verification" render={() => <VerificationContainer />} />
      <Route path="/callback" render={() => <div>OAuth in progress...</div>} />
      {/* <Route path="/recovery" render={() => <PassRecoveryContainer />} />
    <Route path="/new-password" render={() => <NewPassContainer />} /> */}
      <Route path="/" render={() => <MainContainer />} />
    </Switch>
  );
};
