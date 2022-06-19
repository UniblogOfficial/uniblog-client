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
  const isBackgroundImage = multilink.background.substring(0, 3) === 'url';
  return (
    <main
      style={{
        position: 'relative',
        flexDirection: 'column',
        background: isBackgroundImage ? '#0000' : multilink.background,
        overflow: 'clip',
      }}>
      {/* with scrollable outer bg */}
      <PublicMultilink multilink={multilink} className="ml-public" />
      {/* with static outer bg */}
      {/* <div className="scroll-container">
        <PublicMultilink multilink={multilink} className="ml-public" />
      </div> */}
      {isBackgroundImage && (
        <div
          className="outer-bg"
          style={{
            background: multilink.background,
            backgroundPosition: '50% 0%',
            backgroundSize: 'cover',
          }}
        />
      )}
    </main>
  );
};
