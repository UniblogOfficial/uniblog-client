import React, { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import { AdminContainer } from './pages/admin/AdminContainer';
import { LoginContainer } from './pages/auth/login/LoginContainer';
import { SignupContainer } from './pages/auth/signup/SignupContainer';
import { VerificationContainer } from './pages/auth/verification/VerificationContainer';
import { MainContainer } from './pages/main/MainContainer';
import { PublicMLContainer } from './pages/public/PublicMLContainer';

import { initializeApp } from 'bll/reducers';
import { selectAppStatus } from 'bll/selectors';
import { AppStatus } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { Preloader } from 'ui/components/elements';

export const Routes = (props: any) => {
  const dispatch = useDispatch();

  const status = useAppSelector(selectAppStatus);
  const nonBlockingLoading = status === AppStatus.DATA_SAVING;

  const { isInitialized, isMultilinkMode } = useAppSelector(state => state.app);

  const history = useHistory();

  const firstEnterUrl = useRef(history.location.pathname);

  useEffect(() => {
    dispatch(initializeApp(firstEnterUrl.current));
  }, [dispatch, firstEnterUrl]);

  if (!isInitialized) {
    return <Preloader className="app-preloader" />;
  }

  if (isMultilinkMode && isInitialized) {
    return <PublicMLContainer />;
  }

  return (
    <>
      {nonBlockingLoading && (
        <div className="non-blocking-loader">
          <div className="non-blocking-loader__title">
            Saving
            <div className="flashingDots">
              <span>.</span>
            </div>
          </div>
          <div className="non-blocking-loader__loader">
            <Preloader />
          </div>
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
