import React, { FC } from 'react';

import { Redirect } from 'react-router-dom';

import { selectUserData } from '../../../../bll/selectors';
import { useAppSelector } from '../../../../common/hooks';
import { TUser } from '../../../../common/types/instance';

import { Signup } from './Signup';

type TSignupContainerProps = {};

export const SignupContainer: FC<TSignupContainerProps> = () => {
  const userData = useAppSelector<TUser | null>(selectUserData);
  if (userData !== null) {
    return <Redirect to="/" />;
  }
  return <Signup />;
};
