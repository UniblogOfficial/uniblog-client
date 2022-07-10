import React, { useEffect, useState } from 'react';

import 'react-h5-audio-player/lib/styles.css';

import { MLDraftTimer } from '../../../../../common/types/instance';
import { px } from '../../../../../common/utils/ui';

import s from './MLTimer.module.scss';

type TMLTimerProps = {
  id: string;
  block: MLDraftTimer;
  callback?: <T>(payload: T) => void;
};

export const MLTimer = ({ id, block, callback }: TMLTimerProps) => {
  const className = callback ? 'interactive' : undefined;
  const [timerValue, setTimerValue] = useState<number>(block.countdown);
  useEffect(() => {
    setTimerValue(block.countdown);
  }, [block.countdown]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimerValue(timerValue - 1000);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timerValue]);
  const timerTitles = ['Дней', 'Часов', 'Минут', 'Секунд'];
  const days = timerValue && timerValue > 0 ? Math.floor(timerValue / 1000 / 60 / 60 / 24) : 0;
  const hours = timerValue && timerValue > 0 ? Math.floor(timerValue / 1000 / 60 / 60) % 24 : 0;
  const minutes = timerValue && timerValue > 0 ? Math.floor(timerValue / 1000 / 60) % 60 : 0;
  const seconds = timerValue && timerValue > 0 ? Math.floor(timerValue / 1000) % 60 : 0;
  if (!block) return null;
  return (
    <div>
      <section
        className={className}
        style={{ padding: px(block.padding) ?? '0', margin: px(block.margin) ?? '0' }}>
        <div>{block.title}</div>
        <div className={s.timer}>
          <div className={s.timer__titles}>
            {timerTitles.map((title, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i}>{title}</div>
            ))}
          </div>
          <div className={s.timer__items}>
            <div className={`${s.timer__item} ${s.timer__days}`}>
              {days < 10 ? `0${days}` : days}
            </div>
            <div className={`${s.timer__item} ${s.timer__hours}`}>
              {hours < 10 ? `0${hours}` : hours}
            </div>
            <div className={`${s.timer__item} ${s.timer__minutes}`}>
              {minutes < 10 ? `0${minutes}` : minutes}
            </div>
            <div className={`${s.timer__item} ${s.timer__seconds}`}>
              {seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
