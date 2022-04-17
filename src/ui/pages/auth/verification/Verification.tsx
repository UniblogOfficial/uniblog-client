import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { VerificationForm } from './VerificationForm';
// import css from "./Verification.module.scss"

type TVerificationProps = {};

export const Verification: FC<TVerificationProps> = () => (
  //
  <div className="auth-container">
    <div className="auth-paper verification">
      <div className="logo logo__auth">Uniblog</div>
      <h2 className="title__auth">Код подтверждения</h2>
      <VerificationForm />
    </div>
  </div>
);
