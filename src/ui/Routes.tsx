import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import { NotFound } from './pages/404';
import { LoginContainer } from './pages/auth/login/LoginContainer';
import { SignupContainer } from './pages/auth/signup/SignupContainer';
import { VerificationContainer } from './pages/auth/verification/VerificationContainer';
import { MainContainer } from './pages/main/MainContainer';

export const Routes = () => (
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
