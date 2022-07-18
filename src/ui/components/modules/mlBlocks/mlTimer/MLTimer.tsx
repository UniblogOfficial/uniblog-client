import React, { useEffect, useState } from 'react';

import 'react-h5-audio-player/lib/styles.css';

import { MLDraftTimer, Nullable, TImageFile } from '../../../../../common/types/instance';
import { TMLImageContentTimer } from '../../../../../common/types/instance/mlDraft/mlDraft';
import { px } from '../../../../../common/utils/ui';
import imgPlaceholder from '../../../../../img/img-placeholder.png';

import s from './MLTimer.module.scss';

type TMLTimerProps = {
  id: string;
  block: MLDraftTimer;
  callback?: <T>(payload: T) => void;
  image?: Nullable<TMLImageContentTimer<TImageFile>>;
  isPublic?: boolean;
};

export const MLTimer = ({ id, block, callback, image, isPublic }: TMLTimerProps) => {
  const className = callback ? 'interactive' : undefined;
  const imgSrc = image?.image ? image.image.previewUrl : block.image ?? imgPlaceholder;
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
  const days = timerValue && timerValue > 0 ? Math.floor(timerValue / 1000 / 60 / 60 / 24) : 0;
  const hours = timerValue && timerValue > 0 ? Math.floor(timerValue / 1000 / 60 / 60) % 24 : 0;
  const minutes = timerValue && timerValue > 0 ? Math.floor(timerValue / 1000 / 60) % 60 : 0;
  const seconds = timerValue && timerValue > 0 ? Math.floor(timerValue / 1000) % 60 : 0;
  const timerValues = [
    { title: 'Дней', value: days },
    { title: 'Часов', value: hours },
    { title: 'Минут', value: minutes },
    { title: 'Секунд', value: seconds },
  ];

  return (
    <section
      className={timerValue < 0 && isPublic ? s.hidden : className}
      style={{ padding: px(block.padding) ?? '0', margin: px(block.margin) ?? '0' }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      <div className={s.timer__wrapper}>
        <div className={s.timer}>
          {timerValues.map((timerBlock, index) => (
            <div key={index.toString() + timerBlock} className={s.timer__container}>
              <div className={s.timer__titles}>{timerBlock.title}</div>
              <div className={s.timer__values}>
                {timerBlock.value < 10 ? `0${timerBlock.value}` : timerBlock.value}
              </div>
            </div>
          ))}
        </div>
        <div className={s.img__container}>
          <img src={imgSrc} alt="" />
        </div>
      </div>
    </section>
  );
};
