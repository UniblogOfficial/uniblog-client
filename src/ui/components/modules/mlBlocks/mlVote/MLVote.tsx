import React, { MouseEvent } from 'react';

import styles from './MLVote.module.scss';

import { ID } from 'common/constants';
import { IMLDraftVote, Nullable } from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLVoteProps = {
  block: Nullable<IMLDraftVote>;
  isPublic?: boolean;
  callback?: <T>(payload: T) => void;
};

export const MLVote = ({ block, isPublic, callback }: TMLVoteProps) => {
  if (!block) return null;
  const onVoteItemClick = (e: MouseEvent<HTMLInputElement>) => {
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
            {isPublic && (
              <input
                value={cell.value}
                className="interactive"
                type="button"
                onClick={onVoteItemClick}
              />
            )}
            <p
              style={{
                textAlign: block.align,
                fontSize: block.fontSize ?? undefined,
                fontWeight: block.fontWeight ?? undefined,
                backgroundColor: block.titleBackground,
                color: block.color,
              }}>
              {cell.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
