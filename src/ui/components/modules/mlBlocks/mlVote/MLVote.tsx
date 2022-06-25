import React, { MouseEvent } from 'react';

import styles from './MLVote.module.scss';
import { Rating } from './Rating';

import { ID } from 'common/constants';
import { IMLDraftVote, Nullable } from 'common/types/instance';
import { px } from 'common/utils/ui';
import { Button } from 'ui/components/elements';

type TMLVoteProps = {
  block: Nullable<IMLDraftVote>;
  isPublic?: boolean;
  callback?: <T>(payload: T) => void;
};

export const MLVote = ({ block, isPublic, callback }: TMLVoteProps) => {
  if (!block) return null;
  const onVoteItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isPublic && e.currentTarget.dataset.value) {
      const newWindow = document.open(
        `${e.currentTarget.dataset.value}`,
        '_blank',
        'width=777,height=666',
      );
    }
  };
  const className = callback ? `${styles['block']} interactive` : styles['block'];
  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <ul className="ml-vote__list">
        {block.cells.map((cell, i) => (
          <li
            key={ID[i]}
            className={styles['block__item']}
            style={{
              width: '100%',
            }}>
            <p
              className={styles['block__title']}
              style={{
                textAlign: block.align,
                fontSize: block.fontSize,
                fontWeight: block.fontWeight,
                font: block.font,
                backgroundColor: block.titleBackground,
                color: block.color,
              }}>
              {cell.title}
            </p>
            <div className={styles['block__rating']}>
              <Rating totalStars={5} precision={0.5} />
            </div>
          </li>
        ))}
      </ul>
      <Button
        className={styles['block__button-submit']}
        style={{
          background: block.buttonBackground,
          borderRadius: px(block.buttonBorderRadius),
          color: block.buttonColor,
          font: block.buttonFont,
          letterSpacing: px(block.buttonLetterSpacing),
          textShadow: block.buttonTextShadow?.join('px '),
          textAlign: block.buttonAlign,
        }}
        onClick={onVoteItemClick}>
        Отправить
      </Button>
    </section>
  );
};
