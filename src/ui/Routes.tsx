import React, { useEffect, useMemo, useRef } from 'react';

import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { initialize } from '../bll/reducers';
import { useAppDispatch, useAppSelector } from '../common/hooks';

import { Icon } from './components/elements';
import { NotFound } from './pages/404';
import { AdminContainer } from './pages/admin/AdminContainer';
import { LoginContainer } from './pages/auth/login/LoginContainer';
import { SignupContainer } from './pages/auth/signup/SignupContainer';
import { VerificationContainer } from './pages/auth/verification/VerificationContainer';
import { MainContainer } from './pages/main/MainContainer';
import { PublicMLContainer } from './pages/public/PublicMLContainer';

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
      <div
        style={{
          position: 'absolute',
          margin: 'auto',
          width: '75px',
          height: '75px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <Icon name="arrow-clockwise" containerClassName="preloader" />
      </div>
    );
  }

  if (isMultilinkMode && isInitialized) {
    return <PublicMLContainer />;
  }

  return (
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
  );
};
