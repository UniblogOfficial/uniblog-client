import React, { MouseEvent, useState } from 'react';

import { Modal } from '../../modals/Modal';

import styles from './MLVote.module.scss';
import { Rating } from './Rating';

import { ID } from 'common/constants';
import { IMLDraftVote, MLDraftVote, Nullable } from 'common/types/instance';
import { px } from 'common/utils/ui';
import { getMLBlockTextProperties } from 'common/utils/ui/styleAssemblers';
import { Button } from 'ui/components/elements';

type TMLVoteProps = {
  id: string;
  block: MLDraftVote;
  isPublic?: boolean;
  callback?: <T>(payload: T) => void;
};

export const MLVote = ({ id, block, isPublic, callback }: TMLVoteProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onVoteItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    isPublic && toggleModal();
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
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
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
                ...getMLBlockTextProperties(block),
                backgroundColor: block.titleBackground,
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
          fontSize: px(block.fontSize) ?? '18',
          fontWeight: block.buttonFontWeight,
          fontStyle: block.buttonFontStyle,
          fontVariant: block.buttonFontVariant,
          lineHeight: block.buttonLineHeight,
          fontFamily: block.buttonFontFamily,
          letterSpacing: px(block.buttonLetterSpacing),
          textShadow: block.buttonTextShadow?.join('px '),
          textAlign: block.buttonTextAlign,
        }}
        onClick={onVoteItemClick}>
        Отправить
      </Button>
      {isModalVisible && (
        <Modal close={toggleModal}>
          <div className="paper" style={{ height: '200px' }} />
        </Modal>
      )}
    </section>
  );
};
