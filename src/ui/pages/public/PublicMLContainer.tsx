import React, { useCallback } from 'react';

import { Redirect } from 'react-router-dom';

import { PublicMultilink } from './PublicMultilink';

import { PublicPath } from 'common/constants';
import { useAppSelector } from 'common/hooks';

type TPublicMLContainerProps = {};

export const PublicMLContainer = () => {
  const multilink = useAppSelector(state => state.multilink.multilink);
  if (!multilink) {
    return <Redirect to={PublicPath.NOT_FOUND} />;
  }
  return (
    <main
      style={{
        flexDirection: 'column',
        background:
          multilink.background.substring(0, 3) === 'url' ? '#f7f7f7' : multilink.background,
      }}>
      <PublicMultilink multilink={multilink} className="ml-public" />
    </main>
  );
};
