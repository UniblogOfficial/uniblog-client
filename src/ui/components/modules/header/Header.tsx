import React, { FC, useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks';

type THeaderProps = {};

export const Header: FC<THeaderProps> = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <header id="header" />
    </>
  );
};
