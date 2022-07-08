import React, { FC } from 'react';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { MLDraftTimer } from '../../../../../common/types/instance/mlDraft/mlTimer.class';
import { px } from '../../../../../common/utils/ui';

type TMLTimerProps = {
  id: string;
  block: MLDraftTimer;
  callback?: <T>(payload: T) => void;
};

export const MLTimer = ({ id, block, callback }: TMLTimerProps) => {
  const className = callback ? 'interactive' : undefined;
  if (!block) return null;
  const deadline = new Date('2022-07-09T02:00:00');
  // const deadline = new Date(2022, 8, 9);
  function countdownTimer() {
    const diff = +deadline - +new Date();
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    console.log(days);
    console.log(hours);
    console.log(minutes);
    console.log(seconds);
  }
  countdownTimer();
  return (
    <div>
      <section
        className={className}
        style={{ padding: px(block.padding) ?? '0', margin: px(block.margin) ?? '0' }}>
        <div>{block.title}</div>
        <div>{block.countdown}</div>
      </section>
      <div className="timer">
        <div className="timer__items">
          <div className="timer__item timer__days">00</div>
          <div className="timer__item timer__hours">00</div>
          <div className="timer__item timer__minutes">00</div>
          <div className="timer__item timer__seconds">00</div>
        </div>
      </div>
    </div>
  );
};
