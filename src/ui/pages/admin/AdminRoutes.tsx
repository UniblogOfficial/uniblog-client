import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import { AdminContainer } from './AdminContainer';
import { TestPage } from './test/TestPage';

import { TUserState } from 'bll/reducers';
import { selectUserData } from 'bll/selectors';
import { useAppSelector } from 'common/hooks';
import { Role } from 'common/types/instance/user';

type TAdminContainerProps = {};

export const AdminRoutes = () => {
  const userData = useAppSelector<TUserState>(selectUserData);

  // if (userData === null || userData.role !== Role.ADMIN) {
  if (userData === null) {
    return <Redirect to="/login" />;
  }
  return (
    <Switch>
      <Route path="/admin/test" render={() => <TestPage />} />
      <Route path="/admin" render={() => <AdminContainer />} />
      <Redirect from="/admin/*" to="/404" />
    </Switch>
  );
};
