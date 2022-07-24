import React, { ChangeEvent, MouseEvent, useState } from 'react';

import { sendVoteData } from '../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../common/hooks';
import { Modal } from '../../modals/Modal';

import styles from './MLVote.module.scss';
import { Rating } from './Rating';

import { ID } from 'common/constants';
import { MLDraftVote } from 'common/types/instance';
import { px } from 'common/utils/ui';
import { getMLBlockTextProperties } from 'common/utils/ui/styleAssemblers';
import { Button, Input } from 'ui/components/elements';

type TMLVoteProps = {
  id: string;
  block: MLDraftVote;
  isPublic?: boolean;
  callback?: <T>(payload: T) => void;
};

type VoteResultsType = {
  title: string;
  value: number;
};

export const MLVote = ({ id, block, isPublic, callback }: TMLVoteProps) => {
  const [voteResult, setVoteResult] = useState<Array<VoteResultsType>>(
    block.cells.map(cell => ({ title: cell.title, value: cell.value })),
  );
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState('');
  const [modalError, setModalError] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const dispatch = useAppDispatch();
  const setResultCallback = (value: number, ratingId?: string | number) => {
    setError(false);
    setVoteResult(voteResult.map((el, i) => (i === ratingId ? { ...el, value } : el)));
  };
  const onModalClickHandler = () => {
    if (!userName) {
      setModalError(true);
    }
    if (!isVoted) {
      dispatch(sendVoteData({ name: userName, votes: voteResult }));
      setIsModalVisible(false);
      setIsVoted(true);
      setModalError(true);
    }
  };
  const onModalInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModalError(false);
    setUserName(e.currentTarget.value);
  };
  const onVoteItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    const voteCheck = voteResult.map(el => el.value > 0);
    if (voteCheck.every(el => el === true) === true) {
      setError(false);
      isPublic && toggleModal();
      if (isPublic && e.currentTarget.dataset.value) {
        const newWindow = document.open(
          `${e.currentTarget.dataset.value}`,
          '_blank',
          'width=777,height=666',
        );
      }
    } else {
      setError(true);
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
              <Rating setResultCallback={setResultCallback} id={i} totalStars={5} precision={0.5} />
            </div>
          </li>
        ))}
      </ul>
      <Button
        className={styles['block__button-submit']}
        disabled={error}
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
      <span className={styles['error']}>
        {error === true ? 'Необходимо поставить оценку!' : ''}
      </span>
      {isModalVisible && (
        <Modal close={toggleModal}>
          <div
            className="paper"
            style={{
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            Введите имя:
            <Input
              value={userName}
              onChange={onModalInputChange}
              style={{ border: '1px solid black', height: '20px' }}
            />
            <span>{modalError === true ? 'Необходимо ввести имя!' : ''}</span>
            <Button disabled={modalError} onClick={onModalClickHandler}>
              Отправить
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
};
