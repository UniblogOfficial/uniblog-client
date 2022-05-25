/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { memo, FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import styles from './Carousel.module.scss';

type TCarouselProps = {
  items: Array<ReactElement>;
  itemsPerView: number;
  arrows?: Array<ReactElement>;
  arrowStep?: number;
  transitionTime?: number;
  className?: string;
  callback?: (stage: number) => void;
};

export const Carousel: FC<TCarouselProps> = memo(
  ({
    items,
    itemsPerView,
    arrows,
    arrowStep = itemsPerView,
    transitionTime = itemsPerView * 100,
    className,
    callback,
  }) => {
    const fullWidth = items.length / itemsPerView; // in parts exm 2.5
    const fullSlidesAmount = Math.floor(fullWidth); // exm. 2
    const isNoPartialSlide = fullWidth === fullSlidesAmount;
    // offset for second-to-last slide at begin of set, exm. -1.5
    const firstStageValue = fullSlidesAmount - fullWidth - 1;
    // offset for last slide at begin of set, exm. -0.5
    const secondStageValue = isNoPartialSlide ? -2 : fullSlidesAmount - fullWidth;
    const lastStageValue = fullWidth;
    const lastDotIndex = fullWidth - 1; // for noPartialSlide case
    const secondToLastDotIndex = Math.ceil(fullWidth) - 2; // exm. 1
    const [stage, setStage] = useState(fullWidth > 1 ? 0 : firstStageValue);
    const [isRolling, setIsRolling] = useState(false);

    const controlDots = useMemo(() => {
      const dots = [];
      const onStageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (
          stage === secondStageValue &&
          controlDots &&
          +e.currentTarget.value === +controlDots[secondToLastDotIndex].props.value
        ) {
          setStage(firstStageValue);
        } else {
          setStage(+e.currentTarget.value);
        }
        setIsRolling(true);
      };
      for (let i = 0; i < (isNoPartialSlide ? fullWidth : Math.ceil(fullWidth)); i++) {
        if (i === 0) {
          // FIRST VIEW CONTROL DOT
          dots.push(
            <li key={i} value={i}>
              <input
                id={String(i)}
                type="radio"
                onChange={onStageChange}
                value={i}
                checked={
                  stage === i ||
                  (fullWidth >= 2
                    ? stage === lastStageValue
                    : stage === lastStageValue || stage === firstStageValue)
                }
                className={styles.controls__input}
              />
              <label htmlFor={String(i)}>
                <div className={styles.controls__dot} />
              </label>
            </li>,
          );
          continue;
        }
        if (i === (isNoPartialSlide ? fullWidth - 1 : Math.floor(fullWidth)) && i !== 0) {
          // LAST VIEW CONTROL DOT IF EXISTS
          dots.push(
            <li key={Math.floor(fullWidth)} value={fullWidth - 1}>
              <input
                id={String(Math.floor(fullWidth))}
                type="radio"
                onChange={onStageChange}
                value={fullWidth - 1}
                checked={
                  stage === fullWidth - 1 ||
                  stage === (isNoPartialSlide ? firstStageValue : secondStageValue)
                }
                className={styles.controls__input}
              />
              <label htmlFor={String(Math.floor(fullWidth))}>
                <div className={styles.controls__dot} />
              </label>
            </li>,
          );
          continue;
        }
        if (i === Math.floor(fullWidth) - 1 && i !== 0 && fullWidth > 1) {
          // SECOND-TO-LAST VIEW CONTROL DOT IF EXISTS
          dots.push(
            <li key={i} value={i}>
              <input
                id={String(i)}
                type="radio"
                onChange={onStageChange}
                value={i}
                checked={stage === i || stage === firstStageValue}
                className={styles.controls__input}
              />
              <label htmlFor={String(i)}>
                <div className={styles.controls__dot} />
              </label>
            </li>,
          );
          continue;
        }
        //
        // REST VIEW CONTROL DOTS IF EXIST
        dots.push(
          <li key={i} value={i}>
            <input
              id={String(i)}
              type="radio"
              onChange={onStageChange}
              value={i}
              checked={stage === i}
              className={styles.controls__input}
            />
            <label htmlFor={String(i)}>
              <div className={styles.controls__dot} />
            </label>
          </li>,
        );
      }

      return dots.length > 1 ? dots : null;
    }, [
      stage,
      secondStageValue,
      secondToLastDotIndex,
      firstStageValue,
      isNoPartialSlide,
      fullWidth,
      lastStageValue,
    ]);

    useEffect(() => {
      setTimeout(() => {
        setIsRolling(false);
      }, transitionTime);
      if (stage === firstStageValue && controlDots) {
        setTimeout(() => {
          // after transition is complete, translate view from start duplicates tail section to main set
          isNoPartialSlide
            ? setStage(+controlDots[lastDotIndex].props.value)
            : setStage(+controlDots[secondToLastDotIndex].props.value);
        }, transitionTime);
      }
      if (stage === lastStageValue && controlDots) {
        setTimeout(() => {
          // after transition is complete, translate view from end duplicates tail section to main set
          setStage(+controlDots[0].props.value);
        }, transitionTime);
      }
    }, [
      stage,
      controlDots,
      firstStageValue,
      isNoPartialSlide,
      lastDotIndex,
      lastStageValue,
      secondToLastDotIndex,
      transitionTime,
    ]);

    const onArrowClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (controlDots && e.currentTarget.dataset.value) {
          setIsRolling(true);
          if (controlDots[Math.ceil(stage + +e.currentTarget.dataset.value)]) {
            setStage(+controlDots[Math.ceil(stage + +e.currentTarget.dataset.value)].props.value);
          }
          if (+e.currentTarget.dataset.value === -1 && stage === 0) {
            isNoPartialSlide ? setStage(firstStageValue) : setStage(secondStageValue);
          }
          if (+e.currentTarget.dataset.value === -1 && stage < 0) {
            setStage(firstStageValue);
          }
          if (+e.currentTarget.dataset.value === 1 && stage === fullWidth - 1) {
            setStage(lastStageValue);
          }
          if (+e.currentTarget.dataset.value === 1 && stage < 0) {
            setStage(0);
          }
        }
      },
      [
        controlDots,
        stage,
        fullWidth,
        isNoPartialSlide,
        firstStageValue,
        secondStageValue,
        lastStageValue,
      ],
    );

    const [firstSlideItems, midSlideItems, secondToLastSlideItems, lastSlideItems] = useMemo(() => {
      const first = [];
      const mid = [];
      const secondtolast = [];
      const last = [];
      for (let i = 0; i < items.length; i++) {
        if (i < itemsPerView) {
          // FIRST VIEW SET
          first.push(
            <li
              key={i + Math.random()}
              style={{ flex: `1 0 ${100 / itemsPerView}%` }}
              className={styles.item__container}>
              <div className={styles.item}>{items[i]}</div>
            </li>,
          );
          if (i >= itemsPerView * (fullSlidesAmount - 1) && fullWidth <= 2) {
            // SECOND-TO-LAST VIEW
            secondtolast.push(
              <li
                key={i}
                style={{ flex: `1 0 ${100 / itemsPerView}%` }}
                className={styles.item__container}>
                <div className={styles.item}>{items[i]}</div>
              </li>,
            );
          }
        } else if (
          i >=
          (isNoPartialSlide
            ? itemsPerView * (fullSlidesAmount - 1)
            : itemsPerView * fullSlidesAmount)
        ) {
          // LAST VIEW SET
          last.push(
            <li
              key={i}
              style={{ flex: `1 0 ${100 / itemsPerView}%` }}
              className={styles.item__container}>
              <div className={styles.item}>{items[i]}</div>
            </li>,
          );
        } else if (i >= itemsPerView * (fullSlidesAmount - 1) && !isNoPartialSlide) {
          // SECOND-TO-LAST VIEW SET
          secondtolast.push(
            <li
              key={i}
              style={{ flex: `1 0 ${100 / itemsPerView}%` }}
              className={styles.item__container}>
              <div className={styles.item}>{items[i]}</div>
            </li>,
          );
        } else {
          // REST VIEW SETS
          mid.push(
            <li
              key={i}
              style={{ flex: `1 0 ${100 / itemsPerView}%` }}
              className={styles.item__container}>
              <div className={styles.item}>{items[i]}</div>
            </li>,
          );
        }
      }
      return [first, mid, secondtolast, last];
    }, [items, itemsPerView, fullSlidesAmount, fullWidth, isNoPartialSlide]);

    useEffect(() => {
      // may fire stage that not exist in items
      callback && !isRolling && callback(stage);
    }, [callback, stage, isRolling]);
    return (
      <div className={className}>
        <div
          style={{ padding: arrows && items.length > itemsPerView ? '0 1.5em' : '0' }}
          className={styles.container}>
          <ul
            style={{
              transform: `translateX(${-100 * stage - -100 * firstStageValue}%)`,
              transition: `transform ${isRolling ? `${transitionTime}ms` : '0s'} ease-out`,
              filter: `blur(${isRolling ? '1px' : '0px'})`,
            }}>
            {fullWidth > 1 && secondToLastSlideItems} {/* start duplicates tail section */}
            {fullWidth > 1 && lastSlideItems} {/* start duplicates tail section */}
            {firstSlideItems} {/* main set - initial position */}
            {midSlideItems} {/* main set */}
            {fullWidth > 2 && secondToLastSlideItems} {/* main set */}
            {fullWidth > 1 && lastSlideItems} {/* main set */}
            {fullWidth > 1 && firstSlideItems} {/* end duplicates tail section */}
          </ul>
          {arrows && items.length > itemsPerView && (
            <div className={styles.controls__arrows}>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div data-value="-1" onClick={onArrowClick}>
                {arrows[0]}
              </div>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div data-value="1" onClick={onArrowClick}>
                {arrows[1]}
              </div>
            </div>
          )}
        </div>
        <div className={styles.controls__dots}>
          <ul>{controlDots}</ul>
        </div>
      </div>
    );
  },
);
