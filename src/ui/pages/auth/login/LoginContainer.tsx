import React, { FC } from 'react';

import { Redirect } from 'react-router-dom';

import { TUserData } from '../../../../bll/reducers';
import { selectUserData } from '../../../../bll/selectors';
import { useAppSelector } from '../../../../common/hooks';

import { Login } from './Login';

type TLoginContainerProps = {};

export const LoginContainer: FC<TLoginContainerProps> = () => {
  const userData = useAppSelector<TUserData | null>(selectUserData);
  if (userData !== null) {
    return <Redirect to="/" />;
  }
  return <Login />;
};
