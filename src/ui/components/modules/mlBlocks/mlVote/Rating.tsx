import React, { useState, useRef, MouseEvent, ReactElement } from 'react';

import styles from './Rating.module.scss';

import { ID } from 'common/constants';
import { Icon } from 'ui/components/elements';

type TRatingProps = {
  precision: number;
  totalStars: number;
  id?: string | number;
  setResultCallback?: (value: number, ratingId?: string | number) => void; // должен менять чисто value
  emptyIcon?: ReactElement;
  filledIcon?: ReactElement;
};

export const Rating = ({
  precision = 1,
  totalStars = 5,
  setResultCallback,
  id,
  emptyIcon = <Icon name="star" containerClassName={styles['icon-container']} />,
  filledIcon = <Icon name="star-solid" containerClassName={styles['icon-container']} />,
}: TRatingProps) => {
  const [activeStar, setActiveStar] = useState(-1);
  const [hoverActiveStar, setHoverActiveStar] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const ratingContainerRef = useRef<HTMLDivElement>(null);

  const calculateRating = (e: MouseEvent<HTMLDivElement>) => {
    if (ratingContainerRef.current) {
      const { width, left } = ratingContainerRef.current.getBoundingClientRect();
      const percent = (e.clientX - left) / width;
      const numberInStars = percent * totalStars;
      const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision;

      return Number(nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0));
    }
    return -1;
  };
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    setActiveStar(calculateRating(e));
    if (setResultCallback) {
      setResultCallback(calculateRating(e), id);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    setHoverActiveStar(calculateRating(e));
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setHoverActiveStar(-1); // Reset to default state
    setIsHovered(false);
  };

  return (
    <div
      role="presentation"
      className={styles['rating']}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ratingContainerRef}>
      {[...new Array(totalStars)].map((star, i) => {
        const activeState = isHovered ? hoverActiveStar : activeStar;

        const showEmptyIcon = activeState === -1 || activeState < i + 1;

        const isActiveRating = activeState !== 1;
        const isRatingWithPrecision = activeState % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(activeState) === i + 1;
        const showRatingWithPrecision =
          isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        return (
          <div
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
            key={ID[i]}>
            <div
              style={{
                width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%',
                overflow: 'hidden',
                position: 'absolute',
              }}>
              {filledIcon}
            </div>
            {/* Note here */}
            <div
              style={{
                color: showEmptyIcon ? 'gray' : 'inherit',
              }}>
              {showEmptyIcon ? emptyIcon : filledIcon}
            </div>
          </div>
        );
      })}
    </div>
  );
};
