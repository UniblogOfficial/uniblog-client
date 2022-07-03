/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { memo, FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { useAppDispatch } from '../../../../common/hooks';

import styles from './Carousel.module.scss';
import { Dot } from './Dot';

type TCarouselProps = {
  items: Array<ReactElement>;
  itemsPerView: number;
  arrows?: boolean;
  dots?: boolean;
  swipe?: boolean;
  arrowsIcons?: Array<ReactElement>;
  arrowStep?: number;
  transitionTime?: number;
  className?: string;
  callback?: (stage: number) => void;
  currentStage?: number;
  interval?: number;
};

export const Carousel: FC<TCarouselProps> = memo(
  ({
    items,
    itemsPerView,
    arrowStep = itemsPerView,
    transitionTime = itemsPerView * 100,
    className,
    callback,
    currentStage,
    dots,
    arrows,
    arrowsIcons,
    interval,
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
      const dotsElements = [];
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
          dotsElements.push(
            <Dot
              key={i}
              value={i}
              id={i}
              onStageChange={onStageChange}
              checked={
                stage === i ||
                (fullWidth >= 2
                  ? stage === lastStageValue
                  : stage === lastStageValue || stage === firstStageValue)
              }
            />,
          );
          continue;
        }
        if (i === (isNoPartialSlide ? fullWidth - 1 : Math.floor(fullWidth)) && i !== 0) {
          // LAST VIEW CONTROL DOT IF EXISTS
          dotsElements.push(
            <Dot
              key={Math.floor(fullWidth)}
              value={fullWidth - 1}
              id={fullWidth}
              onStageChange={onStageChange}
              checked={
                stage === fullWidth - 1 ||
                stage === (isNoPartialSlide ? firstStageValue : secondStageValue)
              }
            />,
          );
          continue;
        }
        if (i === Math.floor(fullWidth) - 1 && i !== 0 && fullWidth > 1) {
          // SECOND-TO-LAST VIEW CONTROL DOT IF EXISTS
          dotsElements.push(
            <Dot
              key={i}
              value={i}
              id={i}
              onStageChange={onStageChange}
              checked={stage === i || stage === firstStageValue}
            />,
          );
          continue;
        }
        //
        // REST VIEW CONTROL DOTS IF EXIST
        dotsElements.push(
          <Dot key={i} value={i} id={i} onStageChange={onStageChange} checked={stage === i} />,
        );
      }

      return dotsElements.length > 1 ? dotsElements : null;
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
          const toNextStage = +e.currentTarget.dataset.value === 1;
          const toPrevStage = +e.currentTarget.dataset.value === -1;
          if (controlDots[Math.ceil(stage + +e.currentTarget.dataset.value)]) {
            setStage(+controlDots[Math.ceil(stage + +e.currentTarget.dataset.value)].props.value);
          }
          if (toPrevStage && stage === 0) {
            isNoPartialSlide ? setStage(firstStageValue) : setStage(secondStageValue);
          }
          if (toPrevStage && stage < 0) {
            setStage(firstStageValue);
          }
          if (toNextStage && stage === fullWidth - 1) {
            setStage(lastStageValue);
          }
          if (toNextStage && stage < 0) {
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

    useEffect(() => {
      currentStage && callback && callback(currentStage);
      if (
        stage === secondStageValue &&
        controlDots &&
        currentStage === +controlDots[secondToLastDotIndex].props.value
      ) {
        setStage(firstStageValue);
      } else {
        setStage(currentStage || 0);
      }
      setIsRolling(true);
    }, [callback, currentStage]);

    useEffect(() => {
      const slider = () => {
        if (controlDots) {
          setIsRolling(true);
          if (controlDots[Math.ceil(stage + 1)]) {
            setStage(+controlDots[Math.ceil(stage + 1)].props.value);
          }
          if (stage === fullWidth - 1) {
            setStage(lastStageValue);
          }
          if (stage < 0) {
            setStage(0);
          }
        }
      };
      // eslint-disable-next-line no-undef
      let timerId: NodeJS.Timeout;
      if (interval) {
        timerId = setTimeout(slider, interval);
      }
      return () => clearTimeout(timerId);
    }, [controlDots]);

    return (
      <div className={className}>
        <div
          style={{ padding: arrowsIcons && items.length > itemsPerView ? '0 1.5em' : '0' }}
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
                {arrowsIcons && arrowsIcons[0]}
              </div>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div data-value="1" onClick={onArrowClick}>
                {arrowsIcons && arrowsIcons[1]}
              </div>
            </div>
          )}
        </div>
        <div className={styles.controls__dots}>
          <ul>{dots && controlDots}</ul>
        </div>
      </div>
    );
  },
);
